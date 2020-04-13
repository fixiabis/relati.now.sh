import React, { ReactNode, useState, useEffect } from "react";
import RelatiGame, { RelatiPiece as Piece, disableAllPieces } from "../../libs/RelatiGame";
import { Coordinate, GridBoard } from "gridboard";
import RelatiPiece, { SymbolColor } from "../RelatiPiece";
import DrawLine from "../DrawLine";
import { getTargetPathsBySourceGrid } from "./utils";
import { useForceUpdate } from "../../utils/hook";

export type Props = {
  game: RelatiGame,
  children?: ReactNode,
  [otherPropName: string]: any,
};

const RelatiVisualEffect = ({ game }: Props) => {
  const forceUpdate = useForceUpdate();
  const [turn, setTurn] = useState(game.turn);
  const [effectLinePaths, setEffectLinePaths] = useState([] as Coordinate[][]);
  const [[clonedBoard]] = useState([new GridBoard<Piece>(game.board.width, game.board.height)]);
  const symbol = game.getPlayerSymbolByTurn(game.turn - 1);
  const color = SymbolColor[symbol];
  const sourceGrid = clonedBoard.grids[game.symbolToSourceGrid[symbol]?.i];

  if (game.turn !== turn) {
    clonedBoard.grids.forEach((grid, i) => {
      const { piece } = game.board.grids[i];

      if (piece) {
        grid.piece = { ...piece };
      }
      else {
        delete grid.piece;
      }
    });

    disableAllPieces(clonedBoard, symbol);

    if (sourceGrid?.piece) {
      sourceGrid.piece.disabled = false;
    }

    effectLinePaths.splice(0, effectLinePaths.length);
    setTurn(game.turn);
    return <></>;
  }

  useEffect(() => {
    let linePaths = [] as Coordinate[][];

    const sourceGrids = clonedBoard.grids.filter(({ piece }) =>
      piece && piece.symbol === symbol && !piece.disabled
    );

    sourceGrids.forEach(sourceGrid =>
      linePaths = [...linePaths, ...getTargetPathsBySourceGrid(sourceGrid)]
    );

    linePaths = linePaths.filter((path, i) => !effectLinePaths.find(effectLinePath => {
      const [pathX, pathY] = path[path.length - 1];
      const [effectPathX, effectPathY] = effectLinePath[effectLinePath.length - 1];
      return pathX === effectPathX && pathY === effectPathY;
    }) && !linePaths.find((linePaths, j) => {
      const [pathX, pathY] = path[path.length - 1];
      const [otherPathX, otherPathY] = linePaths[linePaths.length - 1];
      return pathX === otherPathX && pathY === otherPathY && j < i;
    }));

    setTimeout(() => game.turn === turn && linePaths.length && setEffectLinePaths([
      ...effectLinePaths,
      ...linePaths,
    ]), 100);
  });

  useEffect(() => {
    let hasSourceGrid = false;

    effectLinePaths.forEach(effectLinePath => {
      const grid = clonedBoard.getGridAt(effectLinePath[effectLinePath.length - 1]);

      if (grid?.piece?.disabled) {
        grid.piece.disabled = false;
        hasSourceGrid = true;
      }
    });

    if (hasSourceGrid) {
      setTimeout(forceUpdate, 100);
    }
  });

  const pieces = clonedBoard.grids.map(({ x, y, piece }, i) => (
    piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
  ));

  const effectLines = effectLinePaths.map((linePath, i) => (
    <DrawLine key={i} linePath={linePath} color={color} />
  ));

  return (
    <>
      {effectLines}
      {pieces}
    </>
  );
};

export default RelatiVisualEffect;
