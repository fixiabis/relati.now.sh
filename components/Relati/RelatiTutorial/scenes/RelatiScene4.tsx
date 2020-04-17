import React, { useState } from "react";
import { Props } from "./types";
import Board from "../../../Board";
import { Hint } from "../../../Piece";
import DrawLine from "../../../DrawLine";
import RelatiPiece from "../../RelatiPiece";
import { SAMPLE_RELATI_ROUTES_LIST } from "./utils";
import { CoordinateObject } from "../../../../types";

const RelatiScene4 = ({ nextStep, ...props }: Props) => {
  const [placeStep, setPlaceStep] = useState(0);
  const nextPlaceStep = () => setPlaceStep(placeStep + 1);
  let drawLines: JSX.Element[] = [];
  let hints: JSX.Element[] = [];

  const onGridClick = (coordinate: CoordinateObject) => {
    if (placeStep % 2 === 0) {
      return;
    }

    for (let coordinates of SAMPLE_RELATI_ROUTES_LIST[(placeStep - 1) / 2]) {
      const [x, y] = coordinates[coordinates.length - 1];

      if (coordinate.x === x && coordinate.y === y) {
        if (placeStep === 19) {
          nextStep();
        }
        else {
          nextPlaceStep();
        }
      }
    }
  };

  if (placeStep % 2 === 1) {
    hints = SAMPLE_RELATI_ROUTES_LIST[(placeStep - 1) / 2].map((coordinates, i) => {
      const [x, y] = coordinates[coordinates.length - 1];
      return <Hint key={i} x={x} y={y} color="crimson" />;
    });
  }
  else {
    drawLines = SAMPLE_RELATI_ROUTES_LIST[placeStep / 2].map((coordinates, i) =>
      <DrawLine key={placeStep * 4 + i} linePath={[[4, 4], ...coordinates as [number, number][]]} color="crimson" />
    );

    setTimeout(nextPlaceStep, 500);
  }

  return (
    <>
      <div className="description">這是會用到的連線方式, 隨便點一個點吧!</div>
      <Board id="relati-tutorial" width={9} height={9} onGridClick={onGridClick} {...props}>
        <g>{drawLines}</g>
        <g>{hints}</g>
        <RelatiPiece x={4} y={4} symbol="O" primary />
        <RelatiPiece x={7} y={3} symbol="X" primary />
      </Board>
    </>
  );
};

export default RelatiScene4;
