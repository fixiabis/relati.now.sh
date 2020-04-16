import React, { useState } from "react";
import RELATI_SCENES from "./scenes";

const RelatiTutorial = () => {
  const [step, setStep] = useState(5);
  const nextStep = () => setStep(step + 1);
  const Scene = RELATI_SCENES[step];
  return <Scene nextStep={nextStep} />;
};

export default RelatiTutorial;
