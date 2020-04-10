import * as Piece from "../Piece";
import DrawLine from "../DrawLine";
import { AnyProps } from "../../types";
import { Scene } from "./RelatiTutorial";

export type SceneStep = () => (((coordinate?: { x: number, y: number }) => void) | any);
type SetScene = React.Dispatch<React.SetStateAction<Scene>>;
type SceneStepGenerator = Generator<SceneStep>;

function* generateSceneSteps({ step, pieces, hints, effectLines }: Scene, setScene: SetScene): SceneStepGenerator {
  hints = [...hints];

  const placePiece = (Component: (props: AnyProps) => JSX.Element) => (props: AnyProps) => {
    const i = props.y * 9 + props.x;
    const piece = <Component key={i} {...props} />
    step++;
    pieces[i] = piece;
    setScene({ pieces: pieces, step, effectLines, hints });
  };

  yield () => placePiece(Piece.Focus)({ x: 4, y: 4, color: "crimson" });

  yield () => ({ x, y }) => {
    if (x === 4 && y === 4) {
      placePiece(Piece.SymbolO)({ x: 4, y: 4, primary: true });
    }
  };

  yield () => void setTimeout(() => {
    placePiece(Piece.SymbolX)({ x: 7, y: 4, primary: true })
  }, 1000);

  const groupedCoordinatesList = [
    [
      [[4, 3]],
      [[4, 5]],
      [[3, 4]],
      [[5, 4]]
    ],
    [
      [[3, 3]],
      [[3, 5]],
      [[5, 3]],
      [[5, 5]],
    ],
    [
      [[4, 3], [4, 2]],
      [[4, 5], [4, 6]],
      [[3, 4], [2, 4]],
      [[5, 4], [6, 4]],
    ],
    [
      [[3, 3], [2, 2]],
      [[3, 5], [2, 6]],
      [[5, 3], [6, 2]],
      [[5, 5], [6, 6]],
    ],
    [
      [[4, 3], [4, 2], [3, 2]],
      [[4, 3], [4, 2], [5, 2]],
      [[4, 5], [4, 6], [3, 6]],
      [[4, 5], [4, 6], [5, 6]],
      [[3, 4], [2, 4], [2, 3]],
      [[3, 4], [2, 4], [2, 5]],
      [[5, 4], [6, 4], [6, 3]],
      [[5, 4], [6, 4], [6, 5]],
    ],
    [
      [[4, 3], [3, 3], [2, 3]],
      [[4, 3], [5, 3], [6, 3]],
      [[4, 5], [3, 5], [2, 5]],
      [[4, 5], [5, 5], [6, 5]],
      [[3, 4], [3, 3], [3, 2]],
      [[3, 4], [3, 5], [3, 6]],
      [[5, 4], [5, 3], [5, 2]],
      [[5, 4], [5, 5], [5, 6]],
    ],
    [
      [[4, 3], [3, 3], [3, 2]],
      [[4, 3], [5, 3], [5, 2]],
      [[4, 5], [3, 5], [3, 6]],
      [[4, 5], [5, 5], [5, 6]],
      [[3, 4], [3, 3], [2, 3]],
      [[3, 4], [3, 5], [2, 5]],
      [[5, 4], [5, 3], [6, 3]],
      [[5, 4], [5, 5], [6, 5]],
    ]
  ];

  for (let i = 0; i < groupedCoordinatesList.length; i++) {
    let groupedCoordinates = groupedCoordinatesList[i];

    yield () => setScene({
      step: step + 1,
      pieces,
      hints,
      effectLines: groupedCoordinates.map((coordinates, j) =>
        <DrawLine key={i * 4 + j} path={[{ x: 4, y: 4 }, ...coordinates.map(([x, y]) => ({ x, y }))]} color="crimson" />
      )
    });

    yield () => void setTimeout(() => {
      for (let coordinates of groupedCoordinates) {
        const [x, y] = coordinates[coordinates.length - 1];
        const i = y * 9 + x;
        hints[i] = <Piece.Hint key={i} x={x} y={y} color="crimson" />;
      }

      setScene({
        step: step + 1,
        pieces,
        hints,
        effectLines
      });
    }, 500);

    yield () => void setTimeout(() => setScene({
      step: step + 1,
      pieces,
      hints: [],
      effectLines: []
    }), 500);
  }

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints: groupedCoordinatesList.reduce((hints, groupedCoordinates) => {
      for (let coordinates of groupedCoordinates) {
        const [x, y] = coordinates[coordinates.length - 1];
        const i = y * 9 + x;
        hints[i] = <Piece.Hint key={i} x={x} y={y} color="crimson" />;
      }

      return hints;
    }, [] as JSX.Element[]),
    effectLines: []
  }), 250);
}

export default generateSceneSteps;
