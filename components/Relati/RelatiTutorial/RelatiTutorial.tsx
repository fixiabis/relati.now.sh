import React, { useState, useEffect } from "react";
import { GridBoard } from "gridboard";
import RELATI_SCENES from "./scenes";
import { RelatiPiece } from "../../../libs/Relati";
import { RelatiBoardProps } from "../RelatiBoard";
import { doPlacement } from "./scenes/utils";

type OmittedRelatiBoardPropKeys =
  | "board"
  | "lastPieceCoordinate"
  | "symbolOfPreviousPlayer"
  | "symbolOfCurrentPlayer";

export interface Props extends Omit<RelatiBoardProps, OmittedRelatiBoardPropKeys> {
  step?: number,
  onOver?: () => void;
};

const RelatiTutorial = ({ step: externalStep = 0, ...props }: Props) => {
  const [board] = useState(new GridBoard<RelatiPiece>(9, 9));
  const [step, setStep] = useState(externalStep);
  const [scale, setScale] = useState(0.95);
  const nextStep = () => setStep(step + 1);
  const Scene = RELATI_SCENES[step];
  const style = { transform: `scale(${scale})` };
  doPlacement(board, step);

  useEffect(() => {
    const { innerWidth = 45, innerHeight = 185 } = globalThis;
    const widthRatio = innerWidth / 45;
    const heightRatio = (innerHeight - 140) / 45;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    setScale(scale);
  }, []);

  return (
    <div className="relati-tutorial">
      <Scene board={board} nextStep={nextStep} style={style} {...props} />
    </div>
  );
};

export default RelatiTutorial;
