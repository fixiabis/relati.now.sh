import React from "react";
import RelatiScene22 from "./RelatiScene22";
import { RelatiBoard } from "./components";
import { SceneComponent } from "./types";
import { useTimeout } from "../../../hooks";
import { RelatiGameBasicRule } from "../../../../libraries/RelatiGame";

const RelatiScene23: SceneComponent = ({ toScene, game, sceneDuration, ...props }) => {
  useTimeout(() => toScene(game.isOver ? "24" : "21"), sceneDuration);

  return (
    <>
      <div className="description">很好, 輪到對方了!</div>
      <RelatiBoard game={game} {...props} />
    </>
  );
};

RelatiScene23.initial = (game) => {
  if (game.turn <= 14) {
    RelatiScene22.initial(game);
  }

  if (game.getNowPlayer() === 0 && !game.isOver) {
    const placeableGrids = game.board.grids.filter(
      (grid, i) =>
        ![15, 16, 20, 21].includes(i) &&
        game.validateIsPlayerCanDoPlacement(grid, 0)
    );

    const randomIndexOfPlaceableGrids = Math.floor(Math.random() * placeableGrids.length);
    let randomOfPlaceableGrid = placeableGrids[randomIndexOfPlaceableGrids];

    if (!randomOfPlaceableGrid) {
      const placeableGrids = game.board.grids.filter(
        (grid, i) => game.validateIsPlayerCanDoPlacement(grid, 0)
      );

      const randomIndexOfPlaceableGrids = Math.floor(Math.random() * placeableGrids.length);
      randomOfPlaceableGrid = placeableGrids[randomIndexOfPlaceableGrids];
      console.log(randomOfPlaceableGrid);
    }

    if (randomOfPlaceableGrid) {
      game.doPlacementByCoordinate(randomOfPlaceableGrid.x, randomOfPlaceableGrid.y);
    }
  }
};

export default RelatiScene23;
