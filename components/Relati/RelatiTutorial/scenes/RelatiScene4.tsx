import React, { useState } from "react";
import { Props } from "./types";
import Board from "../../../Board";
import { Hint } from "../../../Piece";
import DrawLine from "../../../DrawLine";
import RelatiPiece from "../../RelatiPiece";
import { SAMPLE_RELATI_ROUTES_LIST } from "./utils";
import { CoordinateObject } from "../../../../types";
import { Coordinate } from "gridboard";

const CAPTIONS = [
  "這是正四方近程連線！穩定但擴張速度較慢！",
  "這是正四方近程連線！穩定但擴張速度較慢！",
  "這是斜四方近程連線！穩定但是會產生破口！",
  "這是斜四方近程連線！穩定但是會產生破口！",
  "這是正四方遠程連線！不穩但擴張效果不錯！",
  "這是正四方遠程連線！不穩但擴張效果不錯！",
  "這是斜四方遠程連線！不穩但擴張效果最佳！",
  "這是斜四方遠程連線！不穩但擴張效果最佳！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！擁有三種連線的方式！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
  "這是側八方遠程連線！比其他遠程連線穩定！",
];

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
    const ms = 1000;
    const style = { animationDuration: `${ms}ms` };

    drawLines = SAMPLE_RELATI_ROUTES_LIST[placeStep / 2].map((coordinates, i) => {
      const key = placeStep * 4 + i;
      const linePath: Coordinate[] = [[4, 4], ...coordinates as [number, number][]];
      return <DrawLine key={key} linePath={linePath} color="crimson" style={style} />
    });

    if (placeStep >= 8) {
      hints = SAMPLE_RELATI_ROUTES_LIST[placeStep / 2].map((coordinates, i) => {
        const [x, y] = coordinates[coordinates.length - 1];
        return <Hint key={i} x={x} y={y} color="crimson" />;
      });
    }

    setTimeout(nextPlaceStep, ms);
  }

  return (
    <>
      <div className="description">{CAPTIONS[placeStep]}</div>
      <Board width={9} height={9} onGridClick={onGridClick} {...props}>
        <g>{drawLines}</g>
        <g>{hints}</g>
        <RelatiPiece x={4} y={4} symbol="O" primary />
        <RelatiPiece x={7} y={3} symbol="X" primary />
      </Board>
    </>
  );
};

export default RelatiScene4;
