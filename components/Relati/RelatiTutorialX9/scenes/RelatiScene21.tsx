import React from "react";
import RelatiScene20 from "./RelatiScene20";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";
import { RelatiGameBasicRule } from "../../../../libraries/RelatiGame";

const RelatiScene21: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene(game.isOver ? "24" : "22"), sceneDuration);

  return (
    <>
      <div className="description">對方隨便下了一手!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene21.initial = (game) => {
  if (game.turn <= 13) {
    RelatiScene20.initial(game);
  }

  if (game.getNowPlayer() === 1 && !game.isOver) {
    const placeableGrids = game.board.grids.filter(
      (grid, i) =>
        ![44, 53].includes(i) &&
        game.validateIsPlayerCanDoPlacement(grid, 1)
    );

    const randomIndexOfPlaceableGrids = Math.floor(Math.random() * placeableGrids.length);
    let randomOfPlaceableGrid = placeableGrids[randomIndexOfPlaceableGrids];

    if (!randomOfPlaceableGrid) {
      const placeableGrids = game.board.grids.filter(
        (grid, i) => game.validateIsPlayerCanDoPlacement(grid, 1)
      );

      const randomIndexOfPlaceableGrids = Math.floor(Math.random() * placeableGrids.length);
      randomOfPlaceableGrid = placeableGrids[randomIndexOfPlaceableGrids];
    }

    if (randomOfPlaceableGrid) {
      game.doPlacementByCoordinate(randomOfPlaceableGrid.x, randomOfPlaceableGrid.y);
    }
  }
};

export default RelatiScene21;
