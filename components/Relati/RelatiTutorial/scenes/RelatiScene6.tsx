import React, { useState, useEffect } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import RelatiGame, { RelatiSymbol, RelatiGrid } from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";

const RelatiScene6 = ({ nextStep, ...props }: Props) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了！");
  const [game] = useState(new RelatiGame(2));
  const [placeSymbol, setPlaceSymbol] = useState<RelatiSymbol>("O");
  const blockedGrid = game.board.getGridAt(6, 6) as RelatiGrid;

  const onGridClick = ({ x, y }: CoordinateObject) => {
    if (game.getNowPlayerSymbol() === placeSymbol) {
      const grid = game.board.getGridAt(x, y) as RelatiGrid;

      if (grid.piece) {
        return;
      }

      game.placeSymbolByCoordinate(x, y);

      if (!grid.piece) {
        return;
      }

      switch (game.turn) {
        case 5:
          if (blockedGrid.piece?.disabled) {
            if (grid?.piece) {
              game.undo();
            }

            return setDescription("這裡好像不行？");
          }
          else if (x === 6 && y === 4) {
            return setDescription("成功了，厲害！甚至切斷別人的連線！");
          }
          else {
            return setDescription("成功了，恭喜你！");
          }
        case 6:
          if (!blockedGrid.piece?.disabled) {
            if (grid?.piece) {
              game.undo();
            }

            return setDescription("這裡好像不行？");
          }
          else if (game.board.grids.filter(grid => grid.piece?.symbol === "O" && !grid.piece.disabled).length === 1) {
            return setDescription("成功了，厲害！切斷了兩個符號！");
          }
          else {
            return setDescription("成功了，恭喜你！");
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
      switch (game.turn) {
        case 3:
        case 4:
          game.placeSymbolByCoordinate(5, 5);
          return setDescription("中間沒空格，被打斷了，如何接回去呢？");
        case 5:
          return setDescription("現在作為藍方，如何再打斷紅方呢？");
      }
    }, 2000);

    return () => clearTimeout(placementTimer);
  });

  if (game.turn === 5 && placeSymbol !== "X") {
    setPlaceSymbol("X");
  }

  return (
    <>
      <div key={game.turn + description} className="description">{description}</div>
      <RelatiBoard
        drawLineDuration={180}
        board={game.board}
        onGridClick={onGridClick}
        symbolOfCurrentPlayer={symbolOfCurrentPlayer}
        symbolOfPreviousPlayer={symbolOfPreviousPlayer}
        {...props} />
    </>
  );
};

export default RelatiScene6;
