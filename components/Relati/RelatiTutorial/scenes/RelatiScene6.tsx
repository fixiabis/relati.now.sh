import React, { useState, useEffect } from "react";
import { Props } from "./types";
import RelatiBoard from "../../RelatiBoard";
import RelatiGame, { RelatiSymbol, RelatiGrid } from "../../../../libs/Relati";
import { CoordinateObject } from "../../../../types";
import { SCENE6_SCRIPTS } from "./utils";

const RelatiScene6 = ({ nextStep, ...props }: Props) => {
  const [description, setDescription] = useState("中間有空格就可以放在那裡了！");
  const [game] = useState(new RelatiGame(2));
  const [placeSymbol, setPlaceSymbol] = useState<RelatiSymbol>("O");
  const blockedGridAtTurn3 = game.board.getGridAt(6, 6) as RelatiGrid;

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
          if (blockedGridAtTurn3.piece?.disabled) {
            game.undo();
            return setDescription("這裡好像不行？");
          }
          else if (x === 6 && y === 4) {
            return setDescription("成功了，厲害！甚至切斷別人的連線！");
          }
          else {
            return setDescription("成功了，恭喜你！");
          }
        case 6:
          if (!blockedGridAtTurn3.piece?.disabled) {
            game.undo();
            return setDescription("這裡好像不行？");
          }
          else if (game.board.grids.filter(grid => grid.piece?.symbol === "O" && !grid.piece.disabled).length === 1) {
            return setDescription("成功了，厲害！切斷了兩個符號！");
          }
          else {
            return setDescription("成功了，恭喜你！");
          }
        case 14:
          if (x !== 4 || y !== 3) {
            game.undo();
            return setDescription("這裡好像不行？");
          }
          else {
            return setDescription("成功了，恭喜你！");
          }
        default:
          console.log(game.turn);
          game.undo();
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
    const [description, ms, coordinate] = SCENE6_SCRIPTS[game.turn - 3] || [];

    if (!description) {
      return;
    }

    const placementTimer = setTimeout(() => {
      if (coordinate) {
        const [x, y] = coordinate;
        game.placeSymbolByCoordinate(x, y);
      }

      setDescription(description);
    }, ms);

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
