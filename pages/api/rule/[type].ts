import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import RelatiGame, { RelatiGameRuleX5, RelatiGameRuleX7, RelatiGameRuleX9, createPieceByCode, RelatiGameRule } from "../../../libraries/RelatiGame";
import { runMiddlewares, Middleware } from "../../../middlewares";

const gameRuleFromSize: Record<number, RelatiGameRule> = {
    25: RelatiGameRuleX5,
    49: RelatiGameRuleX7,
    81: RelatiGameRuleX9,
};

const cors = Cors({
    methods: ["GET"],
});

const allowedSizes = [25, 49, 81];
const allowedTypes = ["is-valid-placement", "placeable-steps", "winner"];

const validateFields: Middleware = (clientRequest, serverResponse, next) => {
    const respondByCodeAndErrorMessage = (code: number, message: string) => {
        serverResponse.status(code);
        serverResponse.json({ message });
    };

    if (clientRequest.method !== "GET") {
        return respondByCodeAndErrorMessage(405, `不允許的方法: ${clientRequest.method}`)
    }

    if (!allowedTypes.includes(clientRequest.query["type"] as string)) {
        return respondByCodeAndErrorMessage(404, `不存在的類型: ${clientRequest.query["type"]}`);
    }

    if (!clientRequest.query["turn"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: turn");
    }

    if (!clientRequest.query["board"] && !clientRequest.query["pieces"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: board 或 pieces");
    }

    if (clientRequest.query["type"] === "is-valid-placement" && !clientRequest.query["at"]) {
        return respondByCodeAndErrorMessage(400, "遺失欄位: at");
    }

    const turn = parseInt(clientRequest.query["turn"] as string);
    const pieceCodesFieldName = clientRequest.query["board"] ? "board" : "pieces";
    const pieceCodes = (clientRequest.query["board"] || clientRequest.query["pieces"]) as string;

    if (!allowedSizes.includes(pieceCodes.length)) {
        return respondByCodeAndErrorMessage(422, `欄位長度不符: ${pieceCodesFieldName}`);
    }

    if (turn < 0 || turn > pieceCodes.length) {
        return respondByCodeAndErrorMessage(422, "欄位範圍不符: turn");
    }

    if (clientRequest.query["type"] === "is-valid-placement") {
        const gridIndex = parseInt(clientRequest.query["at"] as string);

        if (gridIndex < 0 || gridIndex >= pieceCodes.length) {
            return respondByCodeAndErrorMessage(422, "欄位範圍不符: at");
        }
    }

    next();
};

const rule = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors, validateFields]);
    const type = clientRequest.query["type"] as string;
    const turn = parseInt(clientRequest.query["turn"] as string);
    const pieceCodes = clientRequest.query["board"] || clientRequest.query["pieces"] as string;
    const gameRule = gameRuleFromSize[pieceCodes.length];

    const game = new RelatiGame(2, gameRule);
    game.turn = turn;

    for (let grid of game.board.grids) {
        const pieceCode = pieceCodes[grid.i];
        grid.piece = createPieceByCode(pieceCode);

        if (grid.piece?.primary) {
            if (grid.piece.symbol === "O") {
                game.playerSourceGrids[0] = grid;
            }
            else {
                game.playerSourceGrids[1] = grid;
            }
        }
    }

    game.reenableAllPieces();
    game.checkIsOverAndFindWinner();
    const player = game.getNowPlayer();

    switch (type) {
        case "is-valid-placement":
            const gridIndex = parseInt(clientRequest.query["at"] as string);
            const grid = game.board.grids[gridIndex];

            return serverResponse.json(
                game.validateIsPlayerCanDoPlacement(grid, player)
            );
        case "placeable-steps":
            return serverResponse.json(game.board.grids.filter(grid =>
                game.validateIsPlayerCanDoPlacement(grid, player)
            ).map(grid => grid.i));
        case "winner":
            if (!game.isOver) {
                serverResponse.status(404);
            }

            return serverResponse.json(game.winner);
    }
};

export default rule;
