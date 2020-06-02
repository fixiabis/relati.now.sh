import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddlewares, Middleware } from "../../utilities/server-side";
import firebaseAdmin from "../../container/firebaseAdmin";
import { GameRoundInfo } from "../../types";

const roundsCollection = firebaseAdmin.firestore().collection("rounds");
const playersCollection = firebaseAdmin.firestore().collection("players");
const allowedMethods = ["POST", "DELETE"];

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

    switch (clientRequest.method) {
        case "POST": {
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

            break;
        }

        case "DELETE": {
            if (!clientRequest.query?.roundId) {
                return respondByCodeAndErrorMessage(400, "遺失條件: roundId");
            }

            if (!clientRequest.query?.playerId) {
                return respondByCodeAndErrorMessage(400, "遺失條件: playerId");
            }

            const playerId = clientRequest.query.playerId as string;
            const playerInfo = (await playersCollection.doc(playerId).get()).data();

            if (!playerInfo) {
                return respondByCodeAndErrorMessage(404, `不存在的玩家: ${playerId}`);
            }

            break;
        }
    }

    next();
};

const game = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);

    switch (clientRequest.method) {
        case "POST": {
            const roundDocuments = (
                await roundsCollection
                    .where("playerX", "==", null)
                    // .orderBy("time", "desc")
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
                serverResponse.json(roundLessInfo);
            }
            else {
                const roundDocumentReference = roundsCollection.doc();
                const roundId = roundDocumentReference.id;
                const type = clientRequest.body.type as string;
                const playerO = clientRequest.body.playerId as string;
                const playerX = null;
                const isOver = false;
                const winner = -1;
                const time = Date.now();
                const roundInfo = { type, isOver, winner, playerO, playerX, time };
                const roundLessInfo = { roundId, playerO, playerX };
                await roundDocumentReference.create(roundInfo);
                serverResponse.json(roundLessInfo);
            }
        }

        case "DELETE": {
            const roundId = clientRequest.query.roundId as string;
            const playerId = clientRequest.query.playerId as string;
            const roundDocumentReference = roundsCollection.doc(roundId);
            const roundInfo = (await roundDocumentReference.get()).data() as GameRoundInfo;

            if (!roundInfo.isOver) {
                const isOver = true;

                if (roundInfo.playerO === playerId) {
                    const winner = 1;
                    await roundDocumentReference.update({ isOver, winner });
                }
                else {
                    const winner = 0;
                    await roundDocumentReference.update({ isOver, winner });
                }
            }

            serverResponse.json(true);
        }
    }
};

export default game;
