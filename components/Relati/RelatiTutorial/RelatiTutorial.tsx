import React, { useState, useEffect } from "react";
import RELATI_SCENES from "./scenes";

const RelatiTutorial = () => {
  const [step, setStep] = useState(0);
  const [scale, setScale] = useState(0.95);
  const nextStep = () => setStep(step + 1);
  const Scene = RELATI_SCENES[step];
  const style = { transform: `scale(${scale})` };

  useEffect(() => {
    const { innerWidth = 45, innerHeight = 185 } = globalThis;
    const widthRatio = innerWidth / 45;
    const heightRatio = (innerHeight - 140) / 45;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    setScale(scale);
  }, []);

  return (
    <div className="relati-tutorial">
      <Scene nextStep={nextStep} style={style} />
    </div>
  );
};

export default RelatiTutorial;
