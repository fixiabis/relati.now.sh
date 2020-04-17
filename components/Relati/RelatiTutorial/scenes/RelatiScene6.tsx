import React, { useState, useEffect } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import RelatiGame from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";

const RelatiScene6 = ({ nextStep, ...props }: Props) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了!");
  const [game] = useState(new RelatiGame(2));
  const blockedGrid = game.board.getGridAt(6, 6);

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() === "O") {
      const grid = game.board.getGridAt(x, y);

      if (grid?.piece) {
        return;
      }

      game.placeSymbolByCoordinate(x, y);

      if (blockedGrid?.piece?.disabled) {
        if (grid?.piece) {
          game.turn--;
          delete grid.piece;
        }

        setDescription("這裡好像不行?");
      }
      else {
        if (x === 6 && y === 4) {
          setDescription("成功了, 厲害!甚至切斷別人的連線!")
        }
        else {
          setDescription("成功了, 恭喜你!");
        }
      }
    }
  };

  if (game.turn === 0) {
    game.placeSymbolByCoordinate(4, 4);
    game.placeSymbolByCoordinate(7, 3);
    game.placeSymbolByCoordinate(6, 6);
  }

  const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
  const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

  useEffect(() => {
    const placementTimer = setTimeout(() => {
      if (game.turn === 3) {
        game.placeSymbolByCoordinate(5, 5);
        setDescription("中間沒空格, 被打斷了, 得想辦法接回去才行!");
      }
    }, 2000);

    return () => clearTimeout(placementTimer);
  });

  return (
    <>
      <div className="description">{description}</div>
      <RelatiBoard
        hasTransition
        board={game.board}
        onGridClick={onGridClick}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

export default RelatiScene6;
