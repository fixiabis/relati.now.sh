import * as Piece from "../Piece";
import DrawLine from "../DrawLine";
import { AnyProps } from "../../types";
import { Scene } from "./RelatiTutorial";

export type SceneStep = () => (((coordinate?: { x: number, y: number }) => void) | any);
type SetScene = React.Dispatch<React.SetStateAction<Scene>>;
type SceneStepGenerator = Generator<SceneStep>;

function* generateSceneSteps(scene: Scene, setScene: SetScene): SceneStepGenerator {
  let { step, pieces, hints, effectLines, description } = scene;

  const placePiece = (Component: (props: AnyProps) => JSX.Element) => (props: AnyProps) => {
    const i = props.y * 9 + props.x;
    const piece = <Component key={i} {...props} />;
    step++;
    pieces[i] = piece;
    setScene({ pieces: pieces, step, effectLines, hints, description });
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

  let groupedCoordinatesList = [
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
      [[4, 5], [4, 6], [5, 6]],
      [[3, 4], [2, 4], [2, 5]],
      [[5, 4], [6, 4], [6, 3]],
    ],
    [
      [[4, 3], [4, 2], [5, 2]],
      [[4, 5], [4, 6], [3, 6]],
      [[3, 4], [2, 4], [2, 3]],
      [[5, 4], [6, 4], [6, 5]],
    ],
    [
      [[3, 4], [3, 3], [3, 2]],
      [[5, 4], [5, 5], [5, 6]],
      [[4, 5], [3, 5], [2, 5]],
      [[4, 3], [5, 3], [6, 3]],
    ],
    [
      [[4, 3], [3, 3], [2, 3]],
      [[4, 5], [5, 5], [6, 5]],
      [[3, 4], [3, 5], [3, 6]],
      [[5, 4], [5, 3], [5, 2]],
    ],
    [
      [[4, 3], [3, 3], [3, 2]],
      [[4, 5], [5, 5], [5, 6]],
      [[3, 4], [3, 5], [2, 5]],
      [[5, 4], [5, 3], [6, 3]],
    ],
    [
      [[4, 3], [5, 3], [5, 2]],
      [[4, 5], [3, 5], [3, 6]],
      [[3, 4], [3, 3], [2, 3]],
      [[5, 4], [5, 5], [6, 5]],
    ]
  ];

  const descriptionsForGroupedCoordinates = [
    "一般範圍的連線(正四方)",
    "一般範圍的連線(斜四方)",
    "擴張範圍的連線(正四方)",
    "擴張範圍的連線(斜四方)",
    "擴張範圍的連線(外勾側四方)",
    "擴張範圍的連線(外勾側四方)",
    "擴張範圍的連線(內勾側四方)",
    "擴張範圍的連線(內勾側四方)",
    "擴張範圍的連線(蛇行側四方)",
    "擴張範圍的連線(蛇行側四方)",
  ];

  for (let i = 0; i < groupedCoordinatesList.length; i++) {
    let groupedCoordinates = groupedCoordinatesList[i];
    let description = descriptionsForGroupedCoordinates[i];

    yield () => setScene({
      step: step + 1,
      pieces,
      hints,
      effectLines: groupedCoordinates.map((coordinates, j) =>
        <DrawLine key={i * 4 + j} path={[{ x: 4, y: 4 }, ...coordinates.map(([x, y]) => ({ x, y }))]} color="crimson" />
      ),
      description
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
        effectLines,
        description
      });
    }, 500);

    yield () => setScene({
      step: step + 1,
      pieces,
      hints,
      effectLines: [],
      description: description + ", 隨便點一個點確定你有看懂吧"
    });

    yield () => ({ x, y }) => {
      const i = y * 9 + x;

      if (hints[i]) {
        setScene({
          step: step + 1,
          pieces,
          hints: [],
          effectLines,
          description: ""
        });
      }
    };
  }

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints: groupedCoordinatesList.reduce((hints, groupedCoordinates) => {
      for (let coordinates of groupedCoordinates) {
        const [x, y] = coordinates[coordinates.length - 1];
        const i = y * 9 + x;
        hints[i] = <Piece.Hint key={i} x={x} y={y} color="crimson" opacity={i == 60 ? 1 : 0.2} />;
      }

      return hints;
    }, [] as JSX.Element[]),
    effectLines: [],
    description
  }), 250);

  yield () => placePiece(Piece.Focus)({ x: 6, y: 6, color: "crimson" });
}

export default generateSceneSteps;
