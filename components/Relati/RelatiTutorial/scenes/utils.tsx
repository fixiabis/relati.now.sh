import { PlacementSceneComponentConfig, SceneComponent } from "./types";
import { CoordinateObject } from "../../../../types";
import React, { useState, useEffect } from "react";
import RelatiBoard from "../../RelatiBoard";
import { Focus } from "../../../Piece";

export const SCENE4_SAMPLE_RELATI_ROUTES_LIST = [
  [
    [[4, 3]],
    [[4, 5]],
    [[3, 4]],
    [[5, 4]]
  ],
  [
    [[3, 3]],
    [[3, 5]],
    [[5, 3]],
    [[5, 5]],
  ],
  [
    [[4, 3], [4, 2]],
    [[4, 5], [4, 6]],
    [[3, 4], [2, 4]],
    [[5, 4], [6, 4]],
  ],
  [
    [[3, 3], [2, 2]],
    [[3, 5], [2, 6]],
    [[5, 3], [6, 2]],
    [[5, 5], [6, 6]],
  ],
  [
    [[4, 3], [4, 2], [3, 2]],
    [[4, 5], [4, 6], [5, 6]],
    [[3, 4], [2, 4], [2, 5]],
    [[5, 4], [6, 4], [6, 3]],
  ],
  [
    [[3, 4], [3, 3], [3, 2]],
    [[5, 4], [5, 5], [5, 6]],
    [[4, 5], [3, 5], [2, 5]],
    [[4, 3], [5, 3], [6, 3]],
  ],
  [
    [[4, 3], [3, 3], [3, 2]],
    [[4, 5], [5, 5], [5, 6]],
    [[3, 4], [3, 5], [2, 5]],
    [[5, 4], [5, 3], [6, 3]],
  ],
  [
    [[4, 3], [4, 2], [5, 2]],
    [[4, 5], [4, 6], [3, 6]],
    [[3, 4], [2, 4], [2, 3]],
    [[5, 4], [6, 4], [6, 5]],
  ],
  [
    [[4, 3], [3, 3], [2, 3]],
    [[4, 5], [5, 5], [6, 5]],
    [[3, 4], [3, 5], [3, 6]],
    [[5, 4], [5, 3], [5, 2]],
  ],
  [
    [[4, 3], [5, 3], [5, 2]],
    [[4, 5], [3, 5], [3, 6]],
    [[3, 4], [3, 3], [2, 3]],
    [[5, 4], [5, 5], [6, 5]],
  ]
];

export const SCENE4_CAPTIONS = [
  "這是正四方近程連線!穩定但擴張速度較慢!",
  "這是正四方近程連線!穩定但擴張速度較慢!",
  "這是斜四方近程連線!穩定但是會產生破口!",
  "這是斜四方近程連線!穩定但是會產生破口!",
  "這是正四方遠程連線!不穩但擴張效果不錯!",
  "這是正四方遠程連線!不穩但擴張效果不錯!",
  "這是斜四方遠程連線!不穩但擴張效果最佳!",
  "這是斜四方遠程連線!不穩但擴張效果最佳!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!擁有三種連線的方式!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
  "這是側八方遠程連線!比其他遠程連線穩定!",
];

export function createRelatiPlacementScene(config: PlacementSceneComponentConfig) {
  const {
    children,
    nextStep,
    gameTurn,
    initial,
    onTurnToComputer,
    initialDescription,
    exceptedGridIndexes,
    onPlayerPlacedSymbol,
  } = config;

  const PlacementScene: SceneComponent = ({ toStep, game, ...props }) => {
    const [{ tryAgainCount, description }, setState] = useState({
      tryAgainCount: 0,
      description: initialDescription
    });

    const handleGridClick = ({ x, y }: CoordinateObject) => {
      if (game.getNowPlayerSymbol() !== "O" || game.turn === gameTurn + 2) {
        return;
      }

      const grid = game.board.getGridAt(x, y);

      if (grid?.piece) {
        return;
      }

      game.placeSymbolByCoordinate(x, y);

      if (!grid?.piece) {
        return;
      }

      const description = onPlayerPlacedSymbol(grid) || "這是特殊的戰略!";

      if (exceptedGridIndexes.includes(grid.i)) {
        return setState({ tryAgainCount: 0, description });
      }
      else {
        return setState({ tryAgainCount, description });
      }
    };

    useEffect(() => {
      const doPlacementAfterTimeout = setTimeout(() => {
        switch (game.turn) {
          case gameTurn + 1:
            const result = onTurnToComputer(game);

            if (result === undefined) {
              return toStep(nextStep);
            }

            return setState({ tryAgainCount, description: result });
          case gameTurn + 2:
            game.undo();
            game.undo();
            return setState({ tryAgainCount: tryAgainCount + 1, description: "再試一次?" });
        }
      }, 1500);

      return () => clearTimeout(doPlacementAfterTimeout);
    });

    const [x, y] = game.placementRecords[game.placementRecords.length - 1];
    const boardLastPieceCoordinate = { x, y };
    const symbolOfCurrentPlayer = game.getNowPlayerSymbol();
    const symbolOfPreviousPlayer = game.getPlayerSymbolByTurn(game.turn - 1);

    const focused = tryAgainCount >= 2
      ? (
        exceptedGridIndexes.map(
          (i, key) => <Focus key={key} x={i % 9} y={(i - i % 9) / 9} color="crimson" />
        )
      )
      : undefined;

    return (
      <>
        <div key={description} className="description">{description}</div>
        <RelatiBoard
          board={game.board}
          lastPieceCoordinate={boardLastPieceCoordinate}
          symbolOfCurrentPlayer={symbolOfCurrentPlayer}
          symbolOfPreviousPlayer={symbolOfPreviousPlayer}
          onGridClick={handleGridClick}
          {...props} >
          {children}
          {focused}
        </RelatiBoard>
      </>
    );
  };

  PlacementScene.initial = initial;

  return PlacementScene;
}
