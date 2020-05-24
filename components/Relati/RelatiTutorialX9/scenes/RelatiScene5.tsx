import React from "react";
import RelatiScene4 from "./RelatiScene4";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";

const RelatiScene5: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene("6"), sceneDuration);

  return (
    <>
      <div className="description">很好, 放置的時候需要產生連線!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene5.initial = (game) => {
  RelatiScene4.initial(game);

  if (game.turn === 2) {
    game.doPlacementByCoordinate(5, 5);
  }
};

export default RelatiScene5;
