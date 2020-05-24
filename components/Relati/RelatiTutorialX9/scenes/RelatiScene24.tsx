import React from "react";
import RelatiScene21 from "./RelatiScene21";
import RelatiScene23 from "./RelatiScene23";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { preventEffect } from "./utilities";
import { useTimeout } from "../../../hooks";

const GAME_RESULT_FROM_WINNER = {
  [-1]: "平手!",
  [0]: "你贏了!",
  [1]: "對方贏了!",
};

const RelatiScene24: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  const gameResult = GAME_RESULT_FROM_WINNER[game.winner as -1 | 0 | 1] + " 讓對方沒法放置就贏了!";
  useTimeout(() => toScene("END"), sceneDuration);

  return (
    <>
      <div className="description">{gameResult}</div>
      <RelatiBoard game={game} {...props} {...preventEffect} />
    </>
  );
};

RelatiScene24.initial = (game) => {
  RelatiScene23.initial(game);

  while (!game.isOver) {
    RelatiScene21.initial(game);
    game.checkIsOverAndFindWinner();
    RelatiScene23.initial(game);
    game.checkIsOverAndFindWinner();
  }
};

export default RelatiScene24;
