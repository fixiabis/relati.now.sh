import * as Piece from "../Piece";
import DrawLine from "../DrawLine";
import { AnyProps } from "../../types";
import { Scene } from "./RelatiTutorial";
import RelatiSymbol from "../RelatiPiece";

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
      placePiece(RelatiSymbol)({ x, y, symbol: "O", primary: true });
    }
  };

  yield () => void setTimeout(() => {
    placePiece(RelatiSymbol)({ x: 7, y: 4, symbol: "X", primary: true });
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
        <DrawLine key={i * 4 + j} linePath={[{ x: 4, y: 4 }, ...coordinates.map(([x, y]) => ({ x, y }))]} color="crimson" />
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
        hints[i] = <Piece.Hint key={i} x={x} y={y} color="crimson" />;
      }

      return hints;
    }, [] as JSX.Element[]),
    effectLines: [],
    description: "這些是一個符號可以放置的範圍"
  }), 500);

  yield () => ({ x, y }) => {
    if (x !== 6 || y !== 6) {
      description = "放在這邊試試看吧?";
      placePiece(Piece.Focus)({ x: 6, y: 6, color: "crimson" });
    }
    else {
      step++;
      hints = [];
      placePiece(RelatiSymbol)({ x, y, symbol: "O" });
    }
  };

  yield () => ({ x, y }) => {
    if (x === 6 && y === 6) {
      hints = [];
      placePiece(RelatiSymbol)({ x, y, symbol: "O" });
    }
  };

  yield () => setScene({
    step: step + 1,
    pieces,
    hints,
    effectLines: [
      <DrawLine key={1} linePath={[{ x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }]} color="crimson" />
    ],
    description: "成功連線了，中間必須要是空格才能這樣放呢"
  });

  return;

  yield () => void setTimeout(() => {
    description = "啊，中間的空格沒了";
    placePiece(RelatiSymbol)({ x: 5, y: 5, symbol: "X" })
  }, 1000);

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints,
    effectLines: [
      <DrawLine key={1} linePath={[{ x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }]} color="crimson" />,
      <DrawLine key={2} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }]} color="royalblue" />
    ],
    description: "是擴張範圍的連線(外勾側四方)"
  }), 1000);

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints,
    effectLines: [
      <DrawLine key={1} linePath={[{ x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }]} color="crimson" />,
      <DrawLine key={2} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }]} color="royalblue" />,
      <DrawLine key={3} linePath={[{ x: 7, y: 4 }, { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 5 }]} color="royalblue" />
    ],
    description: "是擴張範圍的連線(內勾側四方)"
  }), 1000);

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints,
    effectLines: [
      <DrawLine key={1} linePath={[{ x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }]} color="crimson" />,
      <DrawLine key={2} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }]} color="royalblue" />,
      <DrawLine key={3} linePath={[{ x: 7, y: 4 }, { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 5 }]} color="royalblue" />,
      <DrawLine key={4} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 5, y: 5 }]} color="royalblue" />
    ],
    description: "是擴張範圍的連線(蛇行側四方)"
  }), 1000);

  yield () => void setTimeout(() => setScene({
    step: step + 1,
    pieces,
    hints,
    effectLines: [
      <DrawLine key={1} linePath={[{ x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }]} color="#888" />,
      <DrawLine key={2} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }]} color="royalblue" />,
      <DrawLine key={3} linePath={[{ x: 7, y: 4 }, { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 5 }]} color="royalblue" />,
      <DrawLine key={4} linePath={[{ x: 7, y: 4 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 5, y: 5 }]} color="royalblue" />
    ],
    description: "連線斷掉了啊"
  }), 1000);

  yield () => void setTimeout(() => {
    hints = groupedCoordinatesList.reduce((hints, groupedCoordinates) => {
      for (let coordinates of groupedCoordinates) {
        const [x, y] = coordinates[coordinates.length - 1];
        const i = y * 9 + x;

        if (i === 50 || i == 60) {
          continue;
        }

        hints[i] = <Piece.Hint key={i} x={x} y={y} color="crimson" />;
      }

      return hints;
    }, [] as JSX.Element[]);

    effectLines = [];
    description = "連線斷掉了啊，得想想辦法接回來才行";
    placePiece(RelatiSymbol)({ x: 6, y: 6, symbol: "O", disabled: true });
  }, 2000);

  yield () => ({ x, y }) => {
    const i = y * 9 + x;
    if (![41, 42, 51, 49, 58, 59].includes(i)) {
      setScene({
        step: step + 1,
        pieces,
        hints,
        effectLines,
        description: "我想這裡現在是連不回去?"
      })
    }
  };
}

export default generateSceneSteps;
