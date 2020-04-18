import Board, { BoardProps } from "../../Board";
import { RelatiSymbol, isGridHasAvailableRelatiRouteBySymbol, RelatiPiece } from "../../../libs/Relati";
import { SymbolColor } from "../RelatiPiece";
import * as Piece from "../../Piece";
import RelatiBoardPieces from "./RelatiBoardPieces";
import { GridBoard } from "gridboard";
import { CoordinateObject } from "../../../types";

export interface Props extends Omit<BoardProps, "width" | "height"> {
  board: GridBoard<RelatiPiece>;
  hasTransition?: boolean;
  lastPieceCoordinate?: CoordinateObject;
  symbolOfPreviousPlayer: RelatiSymbol;
  symbolOfCurrentPlayer: RelatiSymbol;
}

const RelatiBoard = ({ board, symbolOfPreviousPlayer, symbolOfCurrentPlayer, hasTransition, lastPieceCoordinate, ...props }: Props) => {
  const { width, height } = board;
  const colorOfCurrentPlayer = SymbolColor[symbolOfCurrentPlayer];

  const hints = board.grids.map((grid, i) => {
    const { x, y } = grid;

    if (!grid.piece && isGridHasAvailableRelatiRouteBySymbol(grid, symbolOfCurrentPlayer)) {
      return <Piece.Hint key={i} x={x} y={y} color={colorOfCurrentPlayer} />
    }
  });

  const pieces = (
    <RelatiBoardPieces
      board={board}
      hasTransition={hasTransition}
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