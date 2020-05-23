import React from "react";
import "./switch.scss";

type OmittedHTMLDivElementPropKeys =
  | "onChange";

export interface Props extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, OmittedHTMLDivElementPropKeys> {
  value: boolean;
  onChange?: (value: boolean) => void;
}

const Switch = ({ value, onChange }: Props) => {
  const handleThumbClick = () => {
    onChange?.(!value);
  };

  return (
    <div className="switch-container">
      <div className={`switch ${value ? "on" : "off"}`}>
        <div className="switch-thumb" onClick={handleThumbClick} />
      </div>
    </div>
  );
};

export default Switch;
