import React, { useState } from "react";
import RELATI_SCENES from "./scenes";

const RelatiTutorial = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const Scene = RELATI_SCENES[step];
  const { innerWidth = 45, innerHeight = 165 } = globalThis;
  const widthRatio = innerWidth / 45;
  const heightRatio = (innerHeight - 120) / 45;
  const scale = Math.min(widthRatio, heightRatio) * 0.95;
  const style = { transform: `scale(${scale})` };
  return <Scene nextStep={nextStep} style={style} />;
};

export default RelatiTutorial;
