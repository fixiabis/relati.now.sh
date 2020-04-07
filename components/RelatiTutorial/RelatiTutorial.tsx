import React, { useState } from "react";

import { AnyProps } from "../../types";
import * as Piece from "../Piece";
import Board from "../Board";
import Path from "../Path";

type State = {
  progress: number,
  pieces: JSX.Element[],
  hints: JSX.Element[],
  effectLines: JSX.Element[],
}

function* generateAnimation({ progress, pieces, hints, effectLines }: State, setState: React.Dispatch<React.SetStateAction<State>>) {
  const coordinatesList = [
    [[4, 3]],
    [[4, 5]],
    [[3, 4]],
    [[3, 3]],
    [[3, 5]],
    [[5, 3]],
    [[5, 5]],
    [[4, 3], [4, 2]],
    [[4, 5], [4, 6]],
    [[3, 4], [2, 4]],
    [[3, 3], [2, 2]],
    [[3, 5], [2, 6]],
    [[5, 3], [6, 2]],
    [[5, 5], [6, 6]],
  ];

  for (let i = 0; i < coordinatesList.length; i++) {
    let coordinates = coordinatesList[i];
    let [x, y] = coordinates[coordinates.length - 1];

    yield () => setState({
      progress: progress + 1,
      pieces,
      hints,
      effectLines: [
        <Path key={i} path={[{ x: 4, y: 4 }, ...coordinates.map(([x, y]) => ({ x, y }))]} color="crimson" />
      ]
    });

    yield () => void setTimeout(() => setState({
      progress: progress + 1,
      pieces,
      hints: [
        ...hints,
        <Piece.Hint key={i} x={x} y={y} color="crimson" />
      ],
      effectLines
    }), 250);

    yield () => setState({
      progress: progress + 1,
      pieces,
      hints,
      effectLines: []
    });
  }

  const multiCoordinatesList = [
    [
      [[3, 4], [3, 3], [3, 2]],
      [[4, 3], [3, 3], [3, 2]],
      [[4, 3], [4, 2], [3, 2]]
    ],
    [
      [[4, 3], [5, 3], [5, 2]],
      [[4, 3], [4, 2], [5, 2]]
    ],
    [
      [[3, 4], [3, 5], [3, 6]],
      [[4, 5], [3, 5], [3, 6]],
      [[4, 5], [4, 6], [3, 6]]
    ],
    [
      [[4, 5], [5, 5], [5, 6]],
      [[4, 5], [4, 6], [5, 6]]
    ],
    [
      [[4, 3], [3, 3], [2, 3]],
      [[3, 4], [3, 3], [2, 3]],
      [[3, 4], [2, 4], [2, 3]]
    ],
    [
      [[4, 3], [5, 3], [6, 3]]
    ],
    [
      [[4, 5], [3, 5], [2, 5]],
      [[3, 4], [3, 5], [2, 5]],
      [[3, 4], [2, 4], [2, 5]],
    ],
    [
      [[4, 5], [5, 5], [6, 5]]
    ],
  ];

  for (let i = 0; i < multiCoordinatesList.length; i++) {
    let multiCoordinates = multiCoordinatesList[i];

    for (let j = 0; j < multiCoordinates.length; j++) {
      let coordinates = multiCoordinates[j];
      let [x, y] = coordinates[coordinates.length - 1];

      yield () => setState({
        progress: progress + 1,
        pieces,
        hints,
        effectLines: [
          <Path key={coordinatesList.length + i * 3 + j} path={[{ x: 4, y: 4 }, ...coordinates.map(([x, y]) => ({ x, y }))]} color="crimson" />
        ]
      });

      if (j === 0) {
        yield () => void setTimeout(() => setState({
          progress: progress + 1,
          pieces,
          hints: [
            ...hints,
            <Piece.Hint key={coordinatesList.length + i * 3 + j} x={x} y={y} color="crimson" />
          ],
          effectLines
        }), 250);

        yield () => setState({
          progress: progress + 1,
          pieces,
          hints,
          effectLines: []
        });
      }
      else {
        yield () => void setTimeout(() => setState({
          progress: progress + 1,
          pieces,
          hints,
          effectLines: []
        }), 250);
      }
    }
  }
}

const RelatiTutorial = () => {
  const [state, setState] = useState<State>({
    progress: -1,
    pieces: [] as JSX.Element[],
    hints: [] as JSX.Element[],
    effectLines: [] as JSX.Element[]
  });

  let progress = state.progress;
  let pieces = state.pieces;
  let hints = state.hints;
  let effectLines = state.effectLines;

  const placePiece = (Component: (props: AnyProps) => JSX.Element) => (props: AnyProps) => {
    const i = props.y * 9 + props.x;
    const piece = <Component key={i} {...props} />
    progress++;
    pieces[i] = piece;
    setState({ pieces: [...pieces], progress, effectLines, hints });
  };

  const scenes: (() => (((coordinate?: { x: number, y: number }) => void) | any))[] = [
    () => placePiece(Piece.Focus)({ x: 4, y: 4, color: "crimson" }),
    () => ({ x, y }) => {
      if (x === 4 && y === 4) {
        placePiece(Piece.SymbolO)({ x: 4, y: 4, primary: true });
      }
    },
    () => void setTimeout(() => placePiece(Piece.SymbolX)({ x: 5, y: 4, primary: true }), 1000),
    ...Array.from(generateAnimation({
      progress,
      pieces,
      hints,
      effectLines,
    }, setState)),
  ];

  return (
    <>
      <div className="description"></div>
      <Board width={9} height={9} onGridClick={scenes[state.progress + 1]?.()}>
        {state.effectLines}
        {state.pieces}
        {state.hints}
      </Board>
    </>
  );
};

export default RelatiTutorial;
