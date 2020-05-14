import React, { useState, useEffect } from "react";
import { RelatiBoardProps } from "../RelatiBoard";
import RelatiGame, { RelatiGameRuleX9 } from "../../../libraries/RelatiGame";
import RelatiScenes from "./scenes";

type OmittedRelatiBoardPropKeys =
  | "game"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  game?: RelatiGame;
  step?: string;
  onFinish?: () => void;
};

const RelatiTutorial = ({ game: externalGame, step: externalStep = "0", onFinish, ...props }: Props) => {
  const [game] = useState(externalGame || new RelatiGame(2, RelatiGameRuleX9));
  const [step, setStep] = useState(externalStep);
  const [scale, setScale] = useState(0.95);

  const toStep = (step: string) => {
    if (step !== "END") {
      setStep(step);
    }
    else {
      onFinish?.();
    }
  };

  const Scene = RelatiScenes[step] || RelatiScenes["1"];
  const sceneStyle = { transform: `scale(${scale})` };

  useEffect(() => {
    DEBUG: document.title = `how to play (${step})`;
    const { innerWidth = 45, innerHeight = 185 } = globalThis;
    const widthRatio = innerWidth / 45;
    const heightRatio = (innerHeight - 140) / 45;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    setScale(scale);
  });

  Scene.initial(game);

  return (
    <div className="relati-tutorial">
      <Scene game={game} toStep={toStep} style={sceneStyle} {...props} />
    </div>
  );
};

export default RelatiTutorial;
