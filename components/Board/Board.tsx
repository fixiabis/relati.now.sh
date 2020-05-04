import React, { useRef, useEffect } from "react";
import { CoordinateObject } from "../../types";
import "./board.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width: number;
  height: number;
  onGridClick?: ({ x, y }: CoordinateObject) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void | boolean;
}

const Board = ({ width, height, onClick: externalHandleClick, children, className = "", onGridClick: handleGridClick, style, ...props }: Props) => {
  const gridLines = [];
  const viewWidth = width * 5;
  const viewHeight = height * 5;
  const containerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const scaleByMeasurement = () => {
    if (!ref.current || !containerRef.current) {
      return;
    }

    const { offsetWidth, offsetHeight } = containerRef.current;
    const widthRatio = offsetWidth / viewWidth;
    const heightRatio = offsetHeight / viewHeight;
    const scale = Math.min(widthRatio, heightRatio) * 0.95;
    ref.current.style.transform = `scale(${scale})`;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (externalHandleClick?.(event) === false) {
      return event.preventDefault();
    }

    const { offsetX, offsetY } = event.nativeEvent;
    const x = Math.floor(offsetX / 5);
    const y = Math.floor(offsetY / 5);

    if (handleGridClick) {
      handleGridClick({ x, y });
    }
  };

  className = `board${className && ` ${className}`}`;

  style = {
    ...style,
    width: viewWidth,
    height: viewHeight,
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
    scaleByMeasurement();
    window.addEventListener("resize", scaleByMeasurement);
    return () => window.removeEventListener("resize", scaleByMeasurement);
  });

  return (
    <div ref={containerRef} className="board-container">
      <div ref={ref} className={className} style={style} onClick={handleClick} {...props}>
        <svg width={viewWidth} height={viewHeight}>
          {children}
          <g className="grid-lines" stroke="#888" strokeWidth="0.4">{gridLines}</g>
        </svg>
      </div>
    </div>
  );
};

export default Board;
