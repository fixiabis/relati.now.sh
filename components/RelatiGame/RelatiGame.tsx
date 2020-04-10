import React, { useState } from "react";
import RelatiGame, { isGridPlaceable } from "../../libs/RelatiGame";
import Board from "../Board";
import * as Piece from "../Piece";
import MessageBox from "../MessageBox";

export type Scene = {
  game: RelatiGame,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
}

const symbolToColor = {
  "O": "crimson",
  "X": "royalblue",
  "D": "seagreen",
  "U": "darkorange",
  "A": "purple",
};

const RelatiGameView = () => {
  const [state, setState] = useState<Scene>({
    game: new RelatiGame(2),
    pieces: [] as JSX.Element[],
    hints: [] as JSX.Element[],
    effectLines: [] as JSX.Element[],
  });

  const restartGame = () => setState({
    game: new RelatiGame(2),
    pieces: [],
    hints: [],
    effectLines: [],
  });

  let { game, pieces, hints, effectLines } = state;

  const onGridClick = ({ x, y }) => {
    game.placeSymbolToCoordinate(x, y);

    const symbol = game.getNowPlayerSymbol();
    const color = symbolToColor[symbol];

    pieces = game.board.grids.map(({ x, y, piece }, i) => {
      if (piece) {
        const { symbol, primary, disabled } = piece;
        const Component = Piece[`Symbol${symbol}`] as typeof Piece.SymbolO | typeof Piece.SymbolX;
        return <Component key={i} x={x} y={y} primary={primary} disabled={disabled} />;
      }
    });

    hints = game.board.grids.map((grid, i) => {
      const { x, y } = grid;

      if (!grid.piece) {
        if (isGridPlaceable(grid, symbol)) {
          return <Piece.Hint key={i} x={x} y={y} color={color} />
        }
      }
    });

    setState({ game, pieces, hints, effectLines });
  };

  return (
    <>
      <div className="versus-header">
        <div className="player-o"></div>
        <div className="versus"></div>
        <div className="player-x"></div>
      </div>
      <Board id="relati-game" width={9} height={9} onGridClick={onGridClick}>
        {state.effectLines}
        {state.hints}
        {state.pieces}
      </Board>
      <MessageBox show={game.symbolOfWinner !== null} onClick={restartGame}>
        {
          game.symbolOfWinner
            ? game.symbolOfWinner + " win"
            : "draw"
        }
      </MessageBox>
    </>
  );
};

export default RelatiGameView;
