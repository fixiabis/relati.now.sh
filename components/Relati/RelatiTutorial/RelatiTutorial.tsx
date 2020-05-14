import React, { useState, useEffect } from "react";
import { RelatiBoardProps } from "../RelatiBoard";
import RelatiGame, { RelatiGameRuleX5 } from "../../../libraries/RelatiGame";
import RelatiScenes from "./scenes";

type OmittedRelatiBoardPropKeys =
  | "game"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: RelatiGame;
  scene?: string;
  onFinish?: () => void;
};

const RelatiTutorial = ({ game: externalGame, scene: externalStep = "0", onFinish, ...props }: Props) => {
  const [game] = useState(externalGame || new RelatiGame(2, RelatiGameRuleX5));
  const [sceneName, setSceneName] = useState(externalStep);
  const [scale, setScale] = useState(0.95);

  const toScene = (sceneName: string) => {
    if (sceneName !== "END") {
      setSceneName(sceneName);
    }
    else {
      onFinish?.();
    }
  };

  const Scene = RelatiScenes[sceneName] || RelatiScenes["1"];
  const sceneStyle = { transform: `scale(${scale})` };

  useEffect(() => {
    const { innerWidth = game.rule.boardWidth * 5, innerHeight = game.rule.boardHeight * 5 + 140 } = globalThis;
    const widthRatio = innerWidth / (game.rule.boardWidth * 5);
    const heightRatio = (innerHeight - 140) / (game.rule.boardHeight * 5);
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    setScale(scale);
  });

  Scene.initial(game);

  return (
    <div className="relati-tutorial">
      <Scene game={game} toScene={toScene} style={sceneStyle} {...props} />
    </div>
  );
};

export default RelatiTutorial;
