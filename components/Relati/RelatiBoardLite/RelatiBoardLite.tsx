import Board, { BoardProps, CoordinateObject } from "../../Board";
import { RelatiSymbol, isGridHasAvailableRelatiRouteBySymbol, RelatiPiece } from "../../../libs/RelatiLite";
import { RelatiSymbolColor } from "../RelatiPiece";
import { Hint } from "../../Piece";
import RelatiBoardLitePieces from "./RelatiBoardLitePieces";
import { GridBoard } from "gridboard";

export interface Props extends Omit<BoardProps, "width" | "height"> {
  board: GridBoard<RelatiPiece>;
  showHints?: boolean;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
  lastPieceCoordinate?: CoordinateObject;
  symbolOfPreviousPlayer?: RelatiSymbol;
  symbolOfCurrentPlayer: RelatiSymbol;
}

const RelatiBoardLite = ({ board, showHints: isHintsShow = true, symbolOfPreviousPlayer, symbolOfCurrentPlayer, placementEffect, drawLineDuration, lastPieceEmphasized, lastPieceCoordinate, children, ...props }: Props) => {
  const { width, height } = board;
  const colorOfCurrentPlayer = RelatiSymbolColor[symbolOfCurrentPlayer];

  const hints =
    isHintsShow
      ? board.grids.map((grid, i) => {
        const { x, y } = grid;

        if (!grid.piece && isGridHasAvailableRelatiRouteBySymbol(grid, symbolOfCurrentPlayer)) {
          return <Hint key={i} x={x} y={y} color={colorOfCurrentPlayer} />
        }
      })
      : undefined;

  const pieces = (
    <RelatiBoardLitePieces
      board={board}
      placementEffect={placementEffect}
      drawLineDuration={drawLineDuration}
      lastPieceEmphasized={lastPieceEmphasized}
      lastPieceCoordinate={lastPieceCoordinate}
      symbol={symbolOfPreviousPlayer} />
  );

  return (
    <Board width={width} height={height} {...props}>
      {children}
      {pieces}
      <g className="relati-hints">{hints}</g>
    </Board>
  );
};

export default RelatiBoardLite;