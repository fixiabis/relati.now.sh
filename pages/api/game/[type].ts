import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import RelatiGame, { RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9, RelatiGamePlayerX5, RelatiGamePlayerX7, RelatiGamePlayerX9, createPieceByCode, RelatiGameRule, RelatiGamePlayer } from "../../../libraries/RelatiGame";
import { runMiddlewares, Middleware } from "../../../utilities/server-side";
import firebaseAdmin from "../../../container/firebaseAdmin";

const cors = Cors({
    methods: ["POST"],
});

const allowedTypes = ["join"];

const validateFields: Middleware = (clientRequest, serverResponse, next) => {
    const respondByCodeAndErrorMessage = (code: number, message: string) => {
        serverResponse.status(code);
        serverResponse.json({ message });
    };

    if (clientRequest.method !== "POST") {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`)
    }

    if (!allowedTypes.includes(clientRequest.query["type"] as string)) {
        return respondByCodeAndErrorMessage(404, `不存在的類型: ${clientRequest.query["type"]}`);
    }

    if (!clientRequest.body["playerId"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: playerId");
    }

    next();
};

const Game = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);
    const type = clientRequest.query["type"] as string;
    const playerId = clientRequest.body["playerId"] as string;

    switch (type) {
        case "join":
            const playerInfo = (await firebaseAdmin.firestore().collection("players").doc(playerId).get()).data();

            if (!playerInfo) {
                serverResponse.status(404);
                serverResponse.json({ message: `不存在的玩家: ${clientRequest.body["playerId"]}` });
            }

            break;
    }
};

export default Game;
