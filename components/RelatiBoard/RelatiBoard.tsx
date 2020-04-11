import React, { ReactNode } from "react";
import Board from "../Board";
import RelatiGame, { RelatiPiece, disableAllPiecesWithoutPrimarySymbol, isGridPlaceable } from "../../libs/RelatiGame";
import { GridBoard } from "gridboard";
import RelatiSymbol, { SymbolColor } from "../RelatiPiece";
import * as Piece from "../Piece";

export type Props = {
  game: RelatiGame,
  effect?: boolean,
  children?: ReactNode,
  [otherPropName: string]: any,
};

const RelatiBoard = ({ game, effect, children, ...props }: Props) => {
  let { board } = game;

  if (effect) {
    const effectBoard = new GridBoard<RelatiPiece>(board.width, board.height);

    effectBoard.grids.forEach((effectGrid, i) => {
      const grid = board.grids[i];

      if (grid.piece) {
        effectGrid.piece = { ...grid.piece };
      }
    });

    board = effectBoard;

    disableAllPiecesWithoutPrimarySymbol(board, game.getPlayerSymbolByTurn(game.turn - 1));
  }

  const symbol = game.getNowPlayerSymbol();
  const color = SymbolColor[symbol];

  const pieces = board.grids.map(({ x, y, piece }, i) => (
    piece && <RelatiSymbol key={i} x={x} y={y} {...piece} />
  ));

  const hints = game.board.grids.map((grid, i) => {
    const { x, y } = grid;

    if (!grid.piece) {
      if (isGridPlaceable(grid, symbol)) {
        return <Piece.Hint key={i} x={x} y={y} color={color} />
      }
    }
  });

  const effectLines = [];

  return (
    <Board {...props} width={board.width} height={board.height}>
      {effectLines}
      {hints}
      {pieces}
    </Board>
  );
};

export default RelatiBoard;
