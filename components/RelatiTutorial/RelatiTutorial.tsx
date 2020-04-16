import React, { useState } from "react";

import Board from "../Board";
import { generateSceneSteps, SceneStep } from "./utils";

export type Scene = {
  step: number,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
  description: string,
}

const RelatiTutorial = () => {
  const [scene, setScene] = useState<Scene>({
    step: -1,
    pieces: [] as JSX.Element[],
    hints: [] as JSX.Element[],
    effectLines: [] as JSX.Element[],
    description: "點擊中央的框框",
  });

  let { step, pieces, hints, effectLines, description } = scene;
  hints = [...scene.hints];
  pieces = [...scene.pieces];

  const sceneSteps: SceneStep[] = Array.from(
    generateSceneSteps({ step, pieces, hints, effectLines, description }, setScene)
  );

  const nextScene = sceneSteps[scene.step + 1]?.();

  return (
    <>
      <div className="description">{description}</div>
      <Board id="relati-tutorial" width={9} height={9} onGridClick={nextScene}>
        {scene.effectLines}
        {scene.hints}
        {scene.pieces}
      </Board>
    </>
  );
};

export default RelatiTutorial;
