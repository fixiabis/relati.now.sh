import Board, { BoardProps } from "../../Board";
import { RelatiSymbol, isGridHasAvailableRelatiRouteBySymbol, RelatiPiece } from "../../../libs/Relati";
import { RelatiSymbolColor } from "../RelatiPiece";
import { Hint } from "../../Piece";
import RelatiBoardPieces from "./RelatiBoardPieces";
import { GridBoard } from "gridboard";
import { CoordinateObject } from "../../../types";

export interface Props extends Omit<BoardProps, "width" | "height"> {
  board: GridBoard<RelatiPiece>;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
  lastPieceCoordinate?: CoordinateObject;
  symbolOfPreviousPlayer: RelatiSymbol;
  symbolOfCurrentPlayer: RelatiSymbol;
}

const RelatiBoard = ({ board, symbolOfPreviousPlayer, symbolOfCurrentPlayer, placementEffect, drawLineDuration, lastPieceEmphasized, lastPieceCoordinate, ...props }: Props) => {
  const { width, height } = board;
  const colorOfCurrentPlayer = RelatiSymbolColor[symbolOfCurrentPlayer];

  const hints = board.grids.map((grid, i) => {
    const { x, y } = grid;

    if (!grid.piece && isGridHasAvailableRelatiRouteBySymbol(grid, symbolOfCurrentPlayer)) {
      return <Hint key={i} x={x} y={y} color={colorOfCurrentPlayer} />
    }
  });

  const pieces = (
    <RelatiBoardPieces
      board={board}
      placementEffect={placementEffect}
      drawLineDuration={drawLineDuration}
      lastPieceEmphasized={lastPieceEmphasized}
      lastPieceCoordinate={lastPieceCoordinate}
      symbol={symbolOfPreviousPlayer} />
  );

  return (
    <Board width={width} height={height} {...props}>
      {pieces}
      {hints}
    </Board>
  );
};

export default RelatiBoard;
