import React, { ReactNode } from "react";
import Board from "../Board";
import RelatiGame, { isGridPlaceable } from "../../libs/RelatiGame";
import RelatiPiece, { SymbolColor } from "../RelatiPiece";
import * as Piece from "../Piece";
import "./utils";
import RelatiVisualEffect from "./RelatiVisualEffect";

export type Props = {
  game: RelatiGame,
  visualEffect?: boolean,
  children?: ReactNode,
  [otherPropName: string]: any,
};

const RelatiBoard = ({ game, visualEffect: visualEffect, children, ...props }: Props) => {
  const { board } = game;
  const symbol = game.getNowPlayerSymbol();
  const color = SymbolColor[symbol];

  const pieces = board.grids.map(({ x, y, piece }, i) => (
    piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
  ));

  const hints = board.grids.map((grid, i) => {
    const { x, y } = grid;

    if (!grid.piece && isGridPlaceable(grid, symbol)) {
      return <Piece.Hint key={i} x={x} y={y} color={color} />
    }
  });

  return (
    <Board {...props} width={board.width} height={board.height}>
      {hints}
      {visualEffect ? <RelatiVisualEffect game={game} /> : pieces}
    </Board>
  );
};

export default RelatiBoard;
