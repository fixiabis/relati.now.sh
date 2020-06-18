import React, { useState, useEffect } from "react";
import RelatiLevels from "./levels";
import RelatiGame, { RelatiGameRuleX5 } from "../../../libraries/RelatiGame";
import { RelatiPuzzleComponent } from "../types";
import { RelatiPuzzleLevelFailedMessageBox } from "../RelatiPuzzleMessageBox";

const RelatiPuzzleX5: RelatiPuzzleComponent = ({ game: externalGame, level: externalStep = "0", onLeave: handleLeave, onFinish: handleFinish, ...props }) => {
  const [game] = useState(externalGame || new RelatiGame(2, RelatiGameRuleX5));
  const [levelName, setLevelName] = useState(externalStep);
  const [levelFailedMessage, setLevelFailedMessage] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [scale, setScale] = useState(0.95);

  const toLevel = (levelName: string) => {
    if (levelName !== "END") {
      setLevelName(levelName);
    }
    else {
      setIsFinish(true);
    }
  };

  const handleLevelFailed = (message: string) => {
    setLevelFailedMessage(message);
  };

  const handleLevelFailedRetry = () => {
    setLevelFailedMessage("");
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

  if (isFinish && handleFinish) {
    handleFinish();
  }
  else if (levelFailedMessage === "") {
    Level.initial(game);
    game.checkIsOverAndFindWinner();
  }

  return (
    <div className="relati-puzzle">
      <Level game={game} toLevel={toLevel} onFailed={handleLevelFailed} style={levelStyle} {...props} />

      <RelatiPuzzleLevelFailedMessageBox
        show={levelFailedMessage !== ""}
        message={"再來一次？"}
        onRetry={handleLevelFailedRetry}
        onLeave={handleLeave} />
    </div>
  );
};

export default RelatiPuzzleX5;
