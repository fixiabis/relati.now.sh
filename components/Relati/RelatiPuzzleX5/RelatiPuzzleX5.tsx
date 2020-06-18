import React, { useState, useEffect } from "react";
import RelatiLevels from "./levels";
import RelatiGame, { RelatiGameRuleX5 } from "../../../libraries/RelatiGame";
import { RelatiPuzzleComponent } from "../types";

const RelatiTutorialX5: RelatiPuzzleComponent = ({ game: externalGame, level: externalStep = "0", onFinish, ...props }) => {
  const [game] = useState(externalGame || new RelatiGame(2, RelatiGameRuleX5));
  const [levelName, setLevelName] = useState(externalStep);
  const [scale, setScale] = useState(0.95);

  const toLevel = (levelName: string) => {
    if (levelName !== "END") {
      setLevelName(levelName);
    }
    else {
      onFinish?.();
    }
  };

  const Level = RelatiLevels[levelName] || RelatiLevels["1"];
  const levelStyle = { transform: `scale(${scale})` };

  useEffect(() => {
    const { innerWidth = game.rule.boardWidth * 5, innerHeight = game.rule.boardHeight * 5 + 140 } = globalThis;
    const widthRatio = innerWidth / (game.rule.boardWidth * 5);
    const heightRatio = (innerHeight - 140) / (game.rule.boardHeight * 5);
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    setScale(scale);
  });

  Level.initial(game);
  game.checkIsOverAndFindWinner();

  return (
    <div className="relati-tutorial">
      <Level game={game} toLevel={toLevel} style={levelStyle} {...props} />
    </div>
  );
};

export default RelatiTutorialX5;
