import { RelatiBoard, RelatiSymbol, disableAllPiecesByBoard, RelatiPiece as RelatiPieceType } from "../../../libs/Relati";
import RelatiPiece, { RelatiSymbolColor } from "../RelatiPiece";
import { useState, useEffect } from "react";
import { Coordinate, GridBoard } from "gridboard";
import DrawLine from "../../DrawLine";
import { getTargetPathsBySourceGrid, cloneBoard } from "./utils";
import { CoordinateObject } from "../../../types";

export interface Props {
  board: RelatiBoard;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
  lastPieceCoordinate?: CoordinateObject;
  symbol?: RelatiSymbol;
}

const RelatiBoardPieces = ({ board: externalBoard, lastPieceEmphasized, placementEffect, drawLineDuration, lastPieceCoordinate, symbol }: Props) => {
  const isHasTransition = drawLineDuration && externalBoard.grids.filter(({ piece }) => piece).length > 1;

  if (!isHasTransition) {
    const pieces = externalBoard.grids.map(({ x, y, piece }, i) => (
      piece &&
      <RelatiPiece
        key={i}
        x={x}
        y={y}
        placement={placementEffect && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y}
        emphasized={lastPieceEmphasized && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y}
        {...piece} />
    ));

    return <g className="relati-grids">{pieces}</g>;
  }

  const [board, setBoard] = useState(new GridBoard<RelatiPieceType>(externalBoard.width, externalBoard.height));
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

  const isHasSourceGrid = board.grids.some(({ piece }) =>
    piece && piece.symbol === symbol && !piece.disabled
  );

  if (isHasSourceGrid) {
    for (let drawLinePath of drawLinePaths) {
      const grid = board.getGridAt(drawLinePath[drawLinePath.length - 1]);

      if (grid?.piece?.disabled) {
        grid.piece.disabled = false;
      }
    }
  }

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

  const isHasNewSourceGrid = linePaths.some(linePath => {
    const grid = board.getGridAt(linePath[linePath.length - 1]);
    return grid?.piece?.disabled;
  });

  useEffect(() => {
    const addDrawLineAfterTimeout = setTimeout(() => {
      const isBoardPiecesCountEqual = externalBoard.grids.every(
        (grid, i) => typeof grid.piece === typeof board.grids[i].piece
      );

      if (isHasNewSourceGrid && isBoardPiecesCountEqual) {
        setDrawLinePaths([
          ...drawLinePaths,
          ...linePaths,
        ]);
      }
    }, drawLineDuration);

    return () => clearTimeout(addDrawLineAfterTimeout);
  });

  const color = symbol ? RelatiSymbolColor[symbol] : "#888";

  const pieces = board.grids.map(({ x, y, piece }, i) => (
    piece &&
    <RelatiPiece
      key={i}
      x={x}
      y={y}
      placement={placementEffect && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y}
      emphasized={lastPieceEmphasized && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y}
      {...piece} />
  ));

  const drawLineStyle = {
    animationDuration: `${drawLineDuration}ms`
  };

  const drawLines = drawLinePaths.map((linePath, i) => (
    <DrawLine key={i} linePath={linePath} color={color} style={drawLineStyle} />
  ));

  return (
    <>
      <g className="relati-lines">{drawLines}</g>
      <g className="relati-grids">{pieces}</g>
    </>
  );
};

export default RelatiBoardPieces;
