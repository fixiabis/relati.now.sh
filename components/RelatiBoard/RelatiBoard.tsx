import React, { ReactNode } from "react";
import Board from "../Board";
import RelatiGame, { isGridPlaceableBySymbol } from "../../libs/RelatiGame";
import RelatiPiece, { SymbolColor } from "../RelatiPiece";
import * as Piece from "../Piece";
import "./utils";
import RelatiVisualEffect from "./RelatiVisualEffect";

export type Props = {
  game: RelatiGame,
  visually?: boolean,
  children?: ReactNode,
  [otherPropName: string]: any,
};

const RelatiBoard = ({ game, visually = false, children, ...props }: Props) => {
  const { board } = game;
  const symbol = game.getNowPlayerSymbol();
  const color = SymbolColor[symbol];

  let pieces: JSX.Element | (JSX.Element | undefined)[];

  const hints = board.grids.map((grid, i) => {
    const { x, y } = grid;

    if (!grid.piece && isGridPlaceableBySymbol(grid, symbol)) {
      return <Piece.Hint key={i} x={x} y={y} color={color} />
    }
  });

  if (visually) {
    pieces = <RelatiVisualEffect game={game} />;
  }
  else {
    pieces = board.grids.map(({ x, y, piece }, i) => (
      piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
    ));
  }

  return (
    <Board {...props} width={board.width} height={board.height}>
      {hints}
      {pieces}
    </Board>
  );
};

export default RelatiBoard;
