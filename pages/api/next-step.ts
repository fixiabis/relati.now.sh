import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import RelatiGame, { RelatiGameRuleX5, RelatiGameRuleX9, RelatiGamePlayerX5, createPieceByCode } from "../../libraries/RelatiGame";
import { runMiddleware } from "../../middlewares";

const cors = Cors({
    methods: ["GET"],
});

const nextStep = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddleware(clientRequest, serverResponse, cors);
    const turn = parseInt(clientRequest.query["turn"] as string);
    const level = parseInt(clientRequest.query["level"] as string) || 1;
    const pieceCodes = clientRequest.query["board"] || clientRequest.query["pieces"] as string;
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

    const gridIndexText = gamePlayer.getGridIndexForPlacementByGameAndPlayer(game, player, level).toString();
    serverResponse.end(gridIndexText);
};

export default nextStep;
