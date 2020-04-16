import { RelatiBoard, RelatiSymbol, RelatiPiece as RelatiPieceType, disableAllPiecesByBoard } from "../../../libs/Relati";
import RelatiPiece, { SymbolColor } from "../../RelatiPiece";
import { useState, useEffect } from "react";
import { useForceUpdate } from "../../../utils/hook";
import { Coordinate, GridBoard } from "gridboard";
import DrawLine from "../../DrawLine";
import { getTargetPathsBySourceGrid } from "./utils";

export interface Props {
  board: RelatiBoard;
  hasTransition?: boolean;
  symbolOfPreviousPlayer?: RelatiSymbol;
}

const RelatiBoardPieces = ({ board, hasTransition, symbolOfPreviousPlayer }: Props) => {
  console.log("render");
  const forceUpdate = useForceUpdate();
  const [symbol, setSymbol] = useState<RelatiSymbol | "?">("?");
  const [effectLinePaths, setEffectLinePaths] = useState([] as Coordinate[][]);
  const [[clonedBoard]] = useState([new GridBoard<RelatiPieceType>(board.width, board.height)]);
  const color = symbol === "?" ? "#888" : SymbolColor[symbol];

  if (!symbolOfPreviousPlayer || !hasTransition) {
    const pieces = board.grids.map(({ x, y, piece }, i) =>
      piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
    );

    return (
      <>{pieces}</>
    );
  }

  if (symbol !== symbolOfPreviousPlayer) {
    const sourceGrid = clonedBoard.grids.find(grid =>
      grid.piece?.primary && grid.piece?.symbol === symbolOfPreviousPlayer
    );

    clonedBoard.grids.forEach((grid, i) => {
      const { piece } = board.grids[i];

      if (piece) {
        grid.piece = { ...piece };
      }
      else {
        delete grid.piece;
      }
    });

    disableAllPiecesByBoard(clonedBoard, symbolOfPreviousPlayer);

    if (sourceGrid?.piece) {
      sourceGrid.piece.disabled = false;
    }

    effectLinePaths.splice(0, effectLinePaths.length);
    setSymbol(symbolOfPreviousPlayer);
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

    setTimeout(() => symbol === symbolOfPreviousPlayer && linePaths.length && setEffectLinePaths([
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

export default RelatiBoardPieces;
