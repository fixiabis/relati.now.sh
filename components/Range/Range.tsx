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
  const thumbRef = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;

  const thumbStyle = {
    left: `calc(${ratio}% - 12.5px)`,
  };

  const setRangeViewWidthByMeasurement = () => {
    if (ref.current) {
      setRangeViewWidth(ref.current.clientWidth);
    }
  };

  const handleThumbMouseDown = ({ target, clientX }: MouseEvent) => {
    if (target !== thumbRef.current) {
      return;
    }

    setRangeStartCoordinateX(clientX);
  };

  const handleThumbMouseMove = ({ clientX }: MouseEvent) => {
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

  const handleThumbTouchStart = ({ target, touches }: TouchEvent) => {
    if (target !== thumbRef.current) {
      return;
    }

    setRangeStartCoordinateX(touches[0].clientX);
  };

  const handleThumbTouchMove = ({ touches }: TouchEvent) => {
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
    window.addEventListener("mousedown", handleThumbMouseDown);
    window.addEventListener("mousemove", handleThumbMouseMove);
    window.addEventListener("mouseup", resetRangeStartCoordinateX);
    window.addEventListener("touchstart", handleThumbTouchStart);
    window.addEventListener("touchmove", handleThumbTouchMove);
    window.addEventListener("touchend", resetRangeStartCoordinateX);
    window.addEventListener("resize", setRangeViewWidthByMeasurement);

    return () => {
      window.removeEventListener("mousedown", handleThumbMouseDown);
      window.removeEventListener("mousemove", handleThumbMouseMove);
      window.removeEventListener("mouseup", resetRangeStartCoordinateX);
      window.removeEventListener("touchstart", handleThumbTouchStart);
      window.removeEventListener("touchmove", handleThumbTouchMove);
      window.removeEventListener("touchend", resetRangeStartCoordinateX);
      window.removeEventListener("resize", setRangeViewWidthByMeasurement);
    };
  });

  return (
    <div className="range-container">

      <div ref={ref} className="range">
        <div ref={thumbRef} className="range-thumb" style={thumbStyle} />
      </div>
    </div>
  );
};

export default Range;
