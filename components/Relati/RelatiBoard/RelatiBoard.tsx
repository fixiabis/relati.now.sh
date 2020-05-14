import { RelatiSymbolColor } from "../RelatiPiece";
import RelatiBoardPieces from "./RelatiBoardPieces";
import { RelatiGame, RelatiSymbols } from "./libraries";
import { Hint, Board, BoardProps, CoordinateObject } from "./components";

export interface Props extends Omit<BoardProps, "width" | "height"> {
  game: RelatiGame;
  showHints?: boolean;
  placementEffect?: boolean;
  drawLineDuration?: number;
  lastPieceEmphasized?: boolean;
}

const RelatiBoard = ({ game, showHints: isHintsShow = true, placementEffect: isPlacementEffectOn, drawLineDuration, lastPieceEmphasized: isLastPieceEmphasized, children, ...props }: Props) => {
  const { board, rule } = game;
  const { width, height } = board;
  const currentPlayer = game.getNowPlayer();
  const currentPlayerSymbol = RelatiSymbols[currentPlayer];
  const currentPlayerColor = RelatiSymbolColor[currentPlayerSymbol];

  const hints =
    isHintsShow && !game.getIsNotAllPlayerSourcePlaced()
      ? board.grids.map((grid, i) => {
        const { x, y } = grid;
        const isPlayerCanDoPlacement = rule.validateIsPlayerCanDoPlacement(game, grid, currentPlayer);

        if (!grid.piece && isPlayerCanDoPlacement) {
          return <Hint key={i} x={x} y={y} color={currentPlayerColor} />
        }
      })
      : undefined;

  const pieces =
    <RelatiBoardPieces
      game={game}
      placementEffect={isPlacementEffectOn}
      drawLineDuration={drawLineDuration}
      lastPieceEmphasized={isLastPieceEmphasized} />;

  return (
    <Board width={width} height={height} {...props}>
      {children}
      {pieces}
      <g className="relati-hints">{hints}</g>
    </Board>
  );
};

export default RelatiBoard;
