import React, { useState } from "react";

import Board from "../Board";
import generateSceneSteps, { SceneStep } from "./generateSceneSteps";

export type Scene = {
  step: number,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
}

const RelatiTutorial = () => {
  const [scene, setScene] = useState<Scene>({
    step: -1,
    pieces: [] as JSX.Element[],
    hints: [] as JSX.Element[],
    effectLines: [] as JSX.Element[]
  });

  let step = scene.step;
  let pieces = [...scene.pieces];
  let hints = scene.hints;
  let effectLines = scene.effectLines;

  const scenes: SceneStep[] = Array.from(
    generateSceneSteps({
      step,
      pieces,
      hints: hints,
      effectLines,
    }, setScene)
  );

  return (
    <>
      <div className="description"></div>
      <Board id="relati-tutorial" width={9} height={9} onGridClick={scenes[scene.step + 1]?.()}>
        {scene.effectLines}
        {scene.pieces}
        {scene.hints}
      </Board>
    </>
  );
};

export default RelatiTutorial;
