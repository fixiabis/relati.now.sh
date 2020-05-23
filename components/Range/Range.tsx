import React, { useState, useRef, useEffect } from "react";
import "./range.scss";

type OmittedHTMLDivElementPropKeys =
  | "onChange";

export interface Props extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, OmittedHTMLDivElementPropKeys> {
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
}

const Range = ({ min, max, value, onChange }: Props) => {
  const [{ rangeStartCoordinateX, ratio }, setState] = useState({
    rangeStartCoordinateX: -1,
    ratio: ((value - min) / (max - min)) * 100,
  });

  const setRangeStartCoordinateX = (rangeStartCoordinateX: number) => {
    setState({ rangeStartCoordinateX, ratio });
  };

  const resetRangeStartCoordinateX = () => {
    if (rangeStartCoordinateX === -1) {
      return;
    }

    setRangeStartCoordinateX(-1);
    onChange?.((max - min) * (ratio / 100) + min);
  };

  const [rangeViewWidth, setRangeViewWidth] = useState(0);
  const setRatio = (ratio: number) => setState({ rangeStartCoordinateX, ratio });
  const ref = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
  const containerRef = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;

  const thumbStyle = {
    left: `calc(${ratio}% - 12.5px)`,
  };

  const setRangeViewWidthByMeasurement = () => {
    if (ref.current) {
      setRangeViewWidth(ref.current.clientWidth);
    }
  };

  const handleThumbMouseDown = ({ target, clientX }: React.MouseEvent<HTMLDivElement>) => {
    if (target === ref.current || target === containerRef.current) {
      return;
    }

    setRangeStartCoordinateX(clientX);
  };

  const handleThumbMouseMove = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    if (rangeStartCoordinateX === -1) {
      return;
    }

    const newRatio = ratio + ((clientX - rangeStartCoordinateX) / rangeViewWidth * 100);

    if (newRatio < 0 || newRatio > 100) {
      return;
    }

    setState({
      rangeStartCoordinateX: clientX,
      ratio: newRatio,
    });
  };

  const handleThumbTouchStart = ({ target, touches }: React.TouchEvent<HTMLDivElement>) => {
    if (target === ref.current || target === containerRef.current) {
      return;
    }

    setRangeStartCoordinateX(touches[0].clientX);
  };

  const handleThumbTouchMove = ({ touches }: React.TouchEvent<HTMLDivElement>) => {
    if (rangeStartCoordinateX === -1) {
      return;
    }

    const newRatio = ratio + ((touches[0].clientX - rangeStartCoordinateX) / rangeViewWidth * 100);

    if (newRatio < 0 || newRatio > 100) {
      return;
    }

    setState({
      rangeStartCoordinateX: touches[0].clientX,
      ratio: newRatio,
    });
  };

  useEffect(() => setRatio(((value - min) / (max - min)) * 100), [value]);

  useEffect(() => {
    setRangeViewWidthByMeasurement();
    window.addEventListener("mouseup", resetRangeStartCoordinateX);
    window.addEventListener("touchend", resetRangeStartCoordinateX);
    window.addEventListener("resize", setRangeViewWidthByMeasurement);

    return () => {
      window.removeEventListener("mouseup", resetRangeStartCoordinateX);
      window.removeEventListener("touchend", resetRangeStartCoordinateX);
      window.removeEventListener("resize", setRangeViewWidthByMeasurement);
    };
  });

  return (
    <div
      className="range-container"
      ref={containerRef}
      onTouchStart={handleThumbTouchStart}
      onTouchMove={handleThumbTouchMove}
      onMouseDown={handleThumbMouseDown}
      onMouseMove={handleThumbMouseMove}>

      <div ref={ref} className="range">
        <div className="range-thumb" style={thumbStyle} />
      </div>
    </div>
  );
};

export default Range;
