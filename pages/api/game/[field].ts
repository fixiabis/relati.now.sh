import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddlewares, Middleware } from "../../../utilities/server-side";
import firebaseAdmin from "../../../container/firebaseAdmin";
import { GameRoundInfo } from "../../../types";
import { RelatiGameRule, RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9, RelatiGame, convertBoardToPieceCodes } from "../../../libraries";

const roundsCollection = firebaseAdmin.firestore().collection("rounds");
const playersCollection = firebaseAdmin.firestore().collection("players");
const allowedMethods = ["POST", "PUT"];
const allowedFields = ["actions", "isOver"];
const allowedActionNames = ["placement"];

const gameRuleFromType: Record<string, RelatiGameRule> = {
    "x5": RelatiGameRuleX5,
    "x7": RelatiGameRuleX7,
    "x9": RelatiGameRuleX9,
};

const cors = Cors({
    methods: allowedMethods,
});

const validateFields: Middleware = async (clientRequest, serverResponse, next) => {
    const respondByCodeAndErrorMessage = (code: number, message: string) => {
        serverResponse.status(code);
        serverResponse.json({ message });
    };

    if (!allowedMethods.includes(clientRequest.method)) {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`);
    }

    if (clientRequest.query.field === "actions" && clientRequest.method !== "POST") {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`);
    }

    if (clientRequest.query.field === "isOver" && clientRequest.method !== "PUT") {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`);
    }

    if (!allowedFields.includes(clientRequest.query.field as string)) {
        return respondByCodeAndErrorMessage(400, `無效欄位: ${clientRequest.query.field}`);
    }

    if (!clientRequest.query.roundId) {
        return respondByCodeAndErrorMessage(400, "遺失條件: roundId");
    }

    if (!clientRequest.query.playerId) {
        return respondByCodeAndErrorMessage(400, "遺失條件: playerId");
    }

    const playerId = clientRequest.query.playerId as string;
    const playerInfo = (await playersCollection.doc(playerId).get()).data();
    const roundId = clientRequest.query.roundId as string;
    const roundInfo = (await roundsCollection.doc(roundId).get()).data() as GameRoundInfo;

    if (!playerInfo) {
        return respondByCodeAndErrorMessage(404, `不存在的玩家: ${playerId}`);
    }

    if (!roundInfo) {
        return respondByCodeAndErrorMessage(404, `不存在的一輪: ${roundId}`);
    }

    if (clientRequest.query.field === "actions") {
        if (!clientRequest.body?.turn) {
            return respondByCodeAndErrorMessage(400, "遺失欄位: turn");
        }

        if (!clientRequest.body?.name) {
            return respondByCodeAndErrorMessage(400, "遺失欄位: name");
        }

        if (!clientRequest.body?.params) {
            return respondByCodeAndErrorMessage(400, "遺失欄位: params");
        }

        if (!allowedActionNames.includes(clientRequest.body.name)) {
            return respondByCodeAndErrorMessage(422, `欄位格式不符: ${clientRequest.body.name}`);
        }

        const turn = parseInt(clientRequest.body?.turn as string);

        if (turn < 0) {
            return respondByCodeAndErrorMessage(422, "欄位範圍不符: turn");
        }

        if (roundInfo.turn !== turn) {
            return respondByCodeAndErrorMessage(403, "欄位無法對應: turn")
        }

        if (roundInfo.isOver) {
            return respondByCodeAndErrorMessage(403, "遊戲已結束");
        }
    }

    next();
};

const game = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);
    const roundId = clientRequest.query.roundId as string;
    const playerId = clientRequest.query.playerId as string;
    const roundDocumentReference = roundsCollection.doc(roundId);
    const roundInfo = (await roundDocumentReference.get()).data() as GameRoundInfo;

    switch (clientRequest.query.field as string) {
        case "actions":
            const name = clientRequest.body.name as string;
            const params = clientRequest.body.params as string;
            const action = { name, params };
            const { type, actions, turn, pieces } = roundInfo;
            const gameRule = gameRuleFromType[type];
            const game = new RelatiGame(2, gameRule);
            game.restoreByTurnAndPieceCodes(turn, pieces);
            const player = playerId === roundInfo.playerO ? 0 : 1;

            if (action.name === "placement") {
                const [x, y] = action.params.split(",").map(Number);
                game.doPlacementByCoordinateAndPlayer(x, y, player);
                game.reenableAllPieces();
                game.checkIsOverAndFindWinner();

                if (game.turn !== turn) {
                    const { turn, winner, isOver } = game;
                    const pieces = convertBoardToPieceCodes(game.board);
                    actions.push(action);
                    await roundDocumentReference.update({ turn, winner, actions, pieces, isOver });
                    return serverResponse.json(true);
                }
            }

            return serverResponse.json(false);

        case "isOver":
            if (!roundInfo.isOver) {
                const isOver = true;

                if (roundInfo.playerX === null) {
                    const winner = -2;
                    await roundDocumentReference.update({ isOver, winner });
                }
                else if (roundInfo.playerO === playerId) {
                    const winner = 1;
                    await roundDocumentReference.update({ isOver, winner });
                }
                else {
                    const winner = 0;
                    await roundDocumentReference.update({ isOver, winner });
                }
            }

            return serverResponse.json(true);
    }
};

export default game;
