import React, { createRef, useState, useEffect, ReactNode, RefObject } from "react";

import "./index.scss";

export type Props = {
  width: number,
  height: number,
  className?: string,
  children?: ReactNode,
  ref?: RefObject<HTMLDivElement>,
  onBoardClick?: (e: React.MouseEvent) => void;
  onGridClick?: ({ x, y }: { x: number, y: number }) => void,
  [otherPropName: string]: any,
};

const Board = ({ width, height, children, className = "", onGridClick, ref, ...props }: Props) => {
  const gridLines = [];
  const viewWidth = width * 5;
  const viewHeight = height * 5;
  const [scale, setScale] = useState(0);
  const boardContainer = ref || createRef<HTMLDivElement>();

  const setScaleByMeasurement = () => {
    const { offsetWidth, offsetHeight } = boardContainer.current;

    const fittedScale = Math.min(
      offsetWidth / viewWidth,
      offsetHeight / viewHeight
    ) * 0.95;

    if (fittedScale != scale) {
      setScale(fittedScale);
    }
  };

  const onBoardClick = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = Math.floor(offsetX / 5);
    const y = Math.floor(offsetY / 5);
    if (onGridClick) onGridClick({ x, y });
  };

  const boardStyle = {
    width: viewWidth,
    height: viewHeight,
    transform: `scale(${scale})`
  };

  for (let x = 1; x < height; x++) {
    const d = `M 0 ${x * 5} H ${viewWidth}`;
    gridLines.push(<path key={`x-${x}`} d={d} />);
  }

  for (let y = 1; y < width; y++) {
    const d = `M ${y * 5} 0 V ${viewHeight}`;
    gridLines.push(<path key={`y-${y}`} d={d} />);
  }

  useEffect(() => {
    setScaleByMeasurement();
    window.addEventListener("resize", setScaleByMeasurement);
    return () => window.removeEventListener("resize", setScaleByMeasurement);
  });

  return (
    <div {...props} ref={boardContainer} className={`board-container${className && ` ${className}`}`}>
      <div className="board" style={boardStyle} onClick={onBoardClick}>
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
