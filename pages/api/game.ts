import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddlewares, Middleware } from "../../utilities/server-side";
import firebaseAdmin from "../../container/firebaseAdmin";
import { GameRoundInfo, GameRoundAction } from "../../types";
import { RelatiGame, RelatiGameRuleX5, RelatiGameRule, RelatiGameRuleX7, RelatiGameRuleX9, convertBoardToPieceCodes } from "../../libraries";

const roundsCollection = firebaseAdmin.firestore().collection("rounds");
const playersCollection = firebaseAdmin.firestore().collection("players");
const allowedMethods = ["POST"];

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

    if (!clientRequest.body?.type) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: type");
    }

    if (!clientRequest.body?.playerId) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: playerId");
    }

    const playerId = clientRequest.body.playerId;
    const playerInfo = (await playersCollection.doc(playerId).get()).data();

    if (!playerInfo) {
        return respondByCodeAndErrorMessage(404, `不存在的玩家: ${playerId}`);
    }

    next();
};

const game = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);
    const type = clientRequest.body.type as string;

    const roundDocuments = (
        await roundsCollection
            .where("type", "==", type)
            .where("playerX", "==", null)
            .get()
    ).docs;

    if (roundDocuments.length > 0) {
        const [roundDocument] = roundDocuments;
        const roundId = roundDocument.id;
        const roundInfo = roundDocument.data() as GameRoundInfo;
        const { playerO } = roundInfo;
        const playerX = clientRequest.body.playerId as string;
        const roundLessInfo = { roundId, playerO, playerX };
        await roundDocument.ref.update({ playerX });
        return serverResponse.json(roundLessInfo);
    }
    else {
        const roundDocumentReference = roundsCollection.doc();
        const roundId = roundDocumentReference.id;
        const gameRule = gameRuleFromType[type];
        const game = new RelatiGame(2, gameRule);
        const { turn } = game;
        const pieces = convertBoardToPieceCodes(game.board);
        const playerO = clientRequest.body.playerId as string;
        const playerX = null;
        const isOver = false;
        const winner = -1;
        const actions = [] as GameRoundAction[];
        const time = Date.now();
        const roundInfo: GameRoundInfo = { type, turn, pieces, actions, isOver, winner, playerO, playerX, time };
        const roundLessInfo = { roundId, playerO, playerX };
        await roundDocumentReference.create(roundInfo);
        return serverResponse.json(roundLessInfo);
    }
};

export default game;
