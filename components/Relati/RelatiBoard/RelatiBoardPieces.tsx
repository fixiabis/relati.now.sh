import { useState, useEffect } from "react";
import { GridBoard, Coordinate } from "gridboard";
import RelatiPiece, { RelatiSymbolColor } from "../RelatiPiece";
import { CoordinateObject, DrawLine } from "./components";
import { RelatiGame, RelatiPiece as RelatiPieceType, RelatiSymbols, RelatiGameRuleX5 } from "./libraries";
import { cloneBoard, disableAllPiecesByBoardAndSymbol, getTargetPathsBySourceGrid } from "./utilities";

export interface Props {
  game: RelatiGame;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
  lastPieceCoordinate?: CoordinateObject;
}

const RelatiBoardPieces = ({ game, placementEffect: isPlacementEffectOn, drawLineDuration, lastPieceEmphasized: isLastPieceEmphasized, lastPieceCoordinate }: Props) => {
  const { board: externalBoard } = game;
  const previousPlayer = game.getPlayerByTurn(game.turn - 1);
  const previousPlayerSymbool = RelatiSymbols[previousPlayer];
  const isHasTransition = drawLineDuration && externalBoard.grids.filter(({ piece }) => piece).length > 1;

  if (!isHasTransition) {
    const pieces = externalBoard.grids.map(({ x, y, piece }, i) => {
      const isPieceHasPlacementEffect = isPlacementEffectOn && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y;
      const isPieceHasEmphasized = isLastPieceEmphasized && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y;

      if (piece) {
        return (
          <RelatiPiece
            key={i}
            x={x}
            y={y}
            placement={isPieceHasPlacementEffect}
            emphasized={isPieceHasEmphasized}
            {...piece} />
        );
      }
    });

    return <g className="relati-grids">{pieces}</g>;
  }

  const [board, setBoard] = useState(new GridBoard<RelatiPieceType>(externalBoard.width, externalBoard.height));
  const [drawLinePaths, setDrawLinePaths] = useState([] as Coordinate[][]);

  useEffect(() => {
    const isBoardPiecesCountNotEqual = externalBoard.grids.some(
      (grid, i) => typeof grid.piece !== typeof board.grids[i].piece
    );

    if (isBoardPiecesCountNotEqual) {
      const clonedBoard = cloneBoard(externalBoard);
      disableAllPiecesByBoardAndSymbol(clonedBoard, previousPlayerSymbool);
      return setBoard(clonedBoard);
    }
  });

  const isHasSourceGrid = board.grids.some(({ piece }) =>
    piece && piece.symbol === previousPlayerSymbool && !piece.disabled
  );

  if (isHasSourceGrid) {
    for (let drawLinePath of drawLinePaths) {
      const grid = board.getGridAt(drawLinePath[drawLinePath.length - 1]);

      if (grid?.piece?.disabled) {
        grid.piece.disabled = false;
      }
    }
  }

  useEffect(() => {
    let linePaths = [] as Coordinate[][];

    const sourceGrids = board.grids.filter(({ piece }) =>
      piece && piece.symbol === previousPlayerSymbool && !piece.disabled
    );

    if (sourceGrids.length === 0) {
      const sourceGrid = board.grids.find(grid =>
        grid.piece?.primary && grid.piece?.symbol === previousPlayerSymbool
      );

      if (sourceGrid?.piece) {
        sourceGrid.piece.disabled = false;
      }

      board.grids.forEach((grid, i) => {
        if (grid.piece && grid.piece.symbol !== previousPlayerSymbool) {
          if (externalBoard.grids[i].piece) {
            grid.piece.disabled = (externalBoard.grids[i].piece as RelatiPieceType).disabled;
          }
        }
      });

      return setDrawLinePaths(linePaths);
    }

    sourceGrids.forEach(sourceGrid => linePaths = [
      ...linePaths,
      ...getTargetPathsBySourceGrid(sourceGrid, game.rule === RelatiGameRuleX5)
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

  const color = previousPlayerSymbool ? RelatiSymbolColor[previousPlayerSymbool] : "#888";

  const pieces = board.grids.map(({ x, y, piece }, i) => {
    const isPieceHasPlacementEffect = isPlacementEffectOn && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y;
    const isPieceHasEmphasized = isLastPieceEmphasized && lastPieceCoordinate && lastPieceCoordinate.x === x && lastPieceCoordinate.y === y;

    if (piece) {
      return (
        <RelatiPiece
          key={i}
          x={x}
          y={y}
          placement={isPieceHasPlacementEffect}
          emphasized={isPieceHasEmphasized}
          {...piece} />
      );
    }
  });

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
