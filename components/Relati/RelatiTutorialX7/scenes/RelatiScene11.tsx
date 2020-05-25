import React from "react";
import RelatiScene10 from "./RelatiScene10";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene11: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("12"), sceneDuration);

  return (
    <>
      <div className="description">做得好!打斷了對方的連線</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene11.initial = (game) => {
  RelatiScene10.initial(game);

  if (game.turn === 6) {
    game.doPlacementByCoordinate(4, 3);
  }
};

export default RelatiScene11;
