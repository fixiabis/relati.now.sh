import React, { useState } from "react";
import Game, { RelatiSymbol } from "../../../libs/Relati";
import MessageBox from "../../MessageBox";
import { RelatiBoard } from "..";
import Button from "../../Button";
import IconButton from "../../IconButton";
import { CoordinateObject } from "../../../types";
import RelatiPiece from "../RelatiPiece";

export type Props = {
  onLeave?: () => void,
  onOver?: (symbol: RelatiSymbol | "N") => void,
};

// var boardContent = "OXoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxox";

const RelatiGame = ({ onLeave, onOver }: Props) => {
  const [lastPieceCoordinate, setLastPieceCoordinate] = useState<CoordinateObject>({ x: -1, y: -1 });
  const [game, setGame] = useState<Game>(new Game(2));

  const restartGame = () => {
    onOver?.(game.symbolOfWinner as RelatiSymbol | "N");
    setGame(new Game(2));
  };

  // game.board.grids.forEach((grid, i) => {
  //   switch (boardContent[i]) {
  //     case "_":
  //       return;
  //     case "O":
  //       grid.piece = { symbol: "O", primary: true, disabled: false };
  //       break;
  //     case "X":
  //       grid.piece = { symbol: "X", primary: true, disabled: false };
  //       break;
  //     case "o":
  //       grid.piece = { symbol: "O", primary: false, disabled: false };
  //       break;
  //     case "x":
  //       grid.piece = { symbol: "X", primary: false, disabled: false };
  //       break;
  //   }

  //   game.turn++;
  // });

  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  const onGridClick = ({ x, y }: CoordinateObject) => {
    const grid = game.board.getGridAt(x, y);

    if (grid?.piece) {
      return;
    }

    game.placeSymbolByCoordinate(x, y);

    if (grid?.piece) {
      setLastPieceCoordinate({ x, y });
    }
  };

  const messageContainerStyle = { textAlign: "center" as "center" };
  const messageIconStyle = { transform: "scale(10)" };

  const messageIconContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50
  };

  const messageIcon = game.symbolOfWinner !== "?"
    ? (
      <div style={messageIconContainerStyle}>
        <svg width="5" height="5" style={messageIconStyle}>
          <RelatiPiece x={0} y={0} symbol={game.symbolOfWinner} primary />
        </svg>
      </div>
    )
    : undefined;

  const messageText = game.symbolOfWinner !== "?"
    ? game.symbolOfWinner !== "N"
      ? `${game.turn % 2 ? "藍" : "紅"}方玩家獲勝`
      : "平手"
    : "";

  return (
    <>
      <RelatiBoard
        hasTransition
        board={game.board}
        onGridClick={onGridClick}
        lastPieceCoordinate={lastPieceCoordinate}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer} />

      <MessageBox show={game.symbolOfWinner !== "?"}>
        <div style={messageContainerStyle}>
          {messageIcon}
          {messageText}
        </div>
        <Button.Group>
          <IconButton type="retry" color="crimson" onClick={restartGame} />
          <IconButton type="reject" color="royalblue" onClick={onLeave} />
        </Button.Group>
      </MessageBox>
    </>
  );
};

export default RelatiGame;
