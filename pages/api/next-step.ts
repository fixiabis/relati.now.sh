import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import RelatiGame, { RelatiGameRuleX5, RelatiGameRuleX9, RelatiGamePlayerX5, createPieceByCode } from "../../libraries/RelatiGame";
import { runMiddlewares, Middleware } from "../../middlewares";

const cors = Cors({
    methods: ["GET"],
});

const validateFields: Middleware = (clientRequest, serverResponse, next) => {
    const respondByCodeAndErrorMessage = (code: number, message: string) => {
        serverResponse.status(code);
        serverResponse.json({ message });
    };

    if (clientRequest.method !== "GET") {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`)
    }

    if (!clientRequest.query["turn"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: turn");
    }

    if (!clientRequest.query["board"] && !clientRequest.query["pieces"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: board 或 pieces");
    }

    const turn = parseInt(clientRequest.query["turn"] as string);
    const pieceCodesFieldName = clientRequest.query["board"] ? "board" : "pieces";
    const pieceCodes = clientRequest.query["board"] || clientRequest.query["pieces"] as string;

    if (pieceCodes.length !== 25 && pieceCodes.length !== 81) {
        return respondByCodeAndErrorMessage(422, `欄位: ${pieceCodesFieldName} 大小不符`);
    }

    if (turn < 0 || pieceCodes.length === 25 && turn > 25 || pieceCodes.length === 81 && turn > 81) {
        return respondByCodeAndErrorMessage(422, "欄位: turn 規則不符");
    }

    next();
};

const nextStep = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);
    const turn = parseInt(clientRequest.query["turn"] as string);
    const pieceCodes = clientRequest.query["board"] || clientRequest.query["pieces"] as string;
    const level = parseInt(clientRequest.query["level"] as string) || 1;
    const isX5 = pieceCodes.length === 25;
    const rule = isX5 ? RelatiGameRuleX5 : RelatiGameRuleX9;
    const gamePlayer = RelatiGamePlayerX5;
    const game = new RelatiGame(2, rule);
    game.turn = turn;
    const player = game.getNowPlayer();

    for (let grid of game.board.grids) {
        const pieceCode = pieceCodes[grid.i];
        grid.piece = createPieceByCode(pieceCode);
    }

    const gridIndex = gamePlayer.getGridIndexForPlacementByGameAndPlayer(game, player, level);
    serverResponse.json(gridIndex);
};

export default nextStep;
