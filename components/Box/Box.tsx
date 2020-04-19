import React, { useRef } from "react";
import "./box.scss";

export interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show?: boolean;
  onCancel?: () => void;
}

const Box = ({ className = "", show: visible = true, onCancel, ...props }: Props) => {
  const containerDisplay = visible ? "block" : "none";
  const containerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const containerStyle = {
    display: containerDisplay
  };

  const containerOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === containerRef.current) {
      onCancel?.();
    }
  };

  className = `box${className && ` ${className}`}`;

  return (
    <div className="box-container" ref={containerRef} style={containerStyle} onClick={containerOnClick}>
      <div className={className} {...props} />
    </div>
  );
};

export default Box;
