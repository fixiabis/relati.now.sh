import React, { useRef, useEffect, ReactNode } from "react";
import "./board.scss";

export type Props = {
  width: number,
  height: number,
  className?: string,
  children?: ReactNode,
  onGridClick?: ({ x, y }: { x: number, y: number }) => void,
  [otherPropName: string]: any,
};

const Board = ({ width, height, className: boardClassName = "", children, onGridClick, ...props }: Props) => {
  const gridLines = [];
  const viewWidth = width * 5;
  const viewHeight = height * 5;
  const board = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const boardContainer = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  boardClassName = `board${boardClassName && ` ${boardClassName}`}`;

  const scaleBoardByMeasurement = () => {
    if (!board.current || !boardContainer.current) {
      return;
    }

    const { offsetWidth, offsetHeight } = boardContainer.current;
    const widthRatio = offsetWidth / viewWidth;
    const heightRatio = offsetHeight / viewHeight;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    board.current.style.transform = `scale(${scale})`;
  };

  const onBoardClick = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = Math.floor(offsetX / 5);
    const y = Math.floor(offsetY / 5);

    if (onGridClick) {
      onGridClick({ x, y });
    }
  };

  const boardStyle = {
    width: viewWidth,
    height: viewHeight
  };

  for (let x = 1; x < height; x++) {
    const key = `x-${x}`;
    const d = `M 0 ${x * 5} H ${viewWidth}`;
    gridLines.push(<path key={key} d={d} />);
  }

  for (let y = 1; y < width; y++) {
    const key = `y-${y}`;
    const d = `M ${y * 5} 0 V ${viewHeight}`;
    gridLines.push(<path key={key} d={d} />);
  }

  useEffect(() => {
    scaleBoardByMeasurement();
    window.addEventListener("resize", scaleBoardByMeasurement);
    return () => window.removeEventListener("resize", scaleBoardByMeasurement);
  });

  return (
    <div ref={boardContainer} className="board-container">
      <div {...props} ref={board} className={boardClassName} style={boardStyle} onClick={onBoardClick}>
        <svg width={viewWidth} height={viewHeight}>
          {children}
          <g className="grid-lines" stroke="#888" strokeWidth="0.4">
            {gridLines}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Board;
