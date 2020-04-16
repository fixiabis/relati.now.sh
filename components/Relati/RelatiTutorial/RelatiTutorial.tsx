import React, { useState } from "react";
import RELATI_SCENES from "./scenes";
import "./relati-tutorial.scss";

const RelatiTutorial = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const Scene = RELATI_SCENES[step];
  return <Scene nextStep={nextStep} />;
};

export default RelatiTutorial;
