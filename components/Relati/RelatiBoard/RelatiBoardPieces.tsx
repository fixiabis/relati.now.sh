import { RelatiBoard, RelatiSymbol, disableAllPiecesByBoard, RelatiPiece as RelatiPieceType } from "../../../libs/Relati";
import RelatiPiece, { SymbolColor } from "../RelatiPiece";
import { useState } from "react";
import { Coordinate } from "gridboard";
import DrawLine from "../../DrawLine";
import { getTargetPathsBySourceGrid, cloneBoard } from "./utils";

export interface Props {
  board: RelatiBoard;
  hasTransition?: boolean;
  symbol: RelatiSymbol;
}

const RelatiBoardPieces = ({ board: externalBoard, hasTransition, symbol }: Props) => {
  hasTransition = hasTransition && externalBoard.grids.filter(({ piece }) => piece).length > 1;

  if (!hasTransition) {
    const pieces = externalBoard.grids.map(({ x, y, piece }, i) =>
      piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
    );

    return <>{pieces}</>;
  }

  const [board, setBoard] = useState(cloneBoard(externalBoard));
  const [drawLinePaths, setDrawLinePaths] = useState([] as Coordinate[][]);

  const isBoardPiecesCountNotEqual = externalBoard.grids.some(
    (grid, i) => typeof grid.piece !== typeof board.grids[i].piece
  );

  if (isBoardPiecesCountNotEqual) {
    const clonedBoard = cloneBoard(externalBoard);
    disableAllPiecesByBoard(clonedBoard, symbol);
    setBoard(clonedBoard);
    return <></>;
  }

  let linePaths = [] as Coordinate[][];

  drawLinePaths.forEach(drawLinePath => {
    const grid = board.getGridAt(drawLinePath[drawLinePath.length - 1]);

    if (grid?.piece?.disabled) {
      grid.piece.disabled = false;
    }
  });

  const sourceGrids = board.grids.filter(({ piece }) =>
    piece && piece.symbol === symbol && !piece.disabled
  );

  if (sourceGrids.length === 0) {
    const sourceGrid = board.grids.find(grid =>
      grid.piece?.primary && grid.piece?.symbol === symbol
    );

    if (sourceGrid?.piece) {
      sourceGrid.piece.disabled = false;
    }

    board.grids.forEach((grid, i) => {
      if (grid.piece && grid.piece.symbol !== symbol) {
        if (externalBoard.grids[i].piece) {
          grid.piece.disabled = (externalBoard.grids[i].piece as RelatiPieceType).disabled;
        }
      }
    });

    setDrawLinePaths(linePaths);
    return <></>;
  }

  sourceGrids.forEach(sourceGrid => linePaths = [
    ...linePaths,
    ...getTargetPathsBySourceGrid(sourceGrid)
  ]);

  linePaths = linePaths.filter((path, i) => {
    const [x, y] = path[path.length - 1];

    return (
      !drawLinePaths.find(drawLinePath => {
        const [drawPathX, drawPathY] = drawLinePath[drawLinePath.length - 1];
        return x === drawPathX && y === drawPathY;
      }) &&
      !linePaths.find((linePaths, j) => {
        const [otherPathX, otherPathY] = linePaths[linePaths.length - 1];
        return x === otherPathX && y === otherPathY && j < i;
      })
    );
  });

  const hasNewSourceGrid = linePaths.some(linePath => {
    const grid = board.getGridAt(linePath[linePath.length - 1]);
    return grid?.piece?.disabled;
  });

  setTimeout(() => {
    const isBoardPiecesCountEqual = externalBoard.grids.every(
      (grid, i) => typeof grid.piece === typeof board.grids[i].piece
    );

    if (hasNewSourceGrid && isBoardPiecesCountEqual) {
      setDrawLinePaths([
        ...drawLinePaths,
        ...linePaths,
      ]);
    }
  }, 100);

  const color = SymbolColor[symbol];

  const pieces = board.grids.map(({ x, y, piece }, i) => (
    piece && <RelatiPiece key={i} x={x} y={y} {...piece} />
  ));

  const drawLines = drawLinePaths.map((linePath, i) => (
    <DrawLine key={i} linePath={linePath} color={color} />
  ));

  return (
    <>
      {drawLines}
      {pieces}
    </>
  );
};

export default RelatiBoardPieces;
