import React, { useState, useEffect } from "react";
import RELATI_SCENES from "./scenes";
import RelatiGame from "../../../libs/Relati";
import { RelatiBoardProps } from "../RelatiBoard";

type OmittedRelatiBoardPropKeys =
  | "board"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  step?: string,
  onOver?: () => void;
};

const RelatiTutorial = ({ step: externalStep = "0", ...props }: Props) => {
  const [game] = useState(new RelatiGame(2));
  const [step, setStep] = useState(externalStep);
  const [scale, setScale] = useState(0.95);
  const toStep = (step: string) => setStep(step);
  const Scene = RELATI_SCENES[step] || RELATI_SCENES["1"];
  const style = { transform: `scale(${scale})` };

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
      <Scene game={game} toStep={toStep} style={style} {...props} />
    </div>
  );
};

export default RelatiTutorial;
