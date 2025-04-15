import React from "react";
import selectedImg from "../../assests/selected.svg";
import "./styles.scss";

export interface ButtonProps {
  id: string;
  label: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  selected: boolean;
}

const Button = ({ id, label, onClick, disabled, selected }: ButtonProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button
      id={id}
      className={`segment-button-item ${
        selected ? "segment-button-item-selected" : ""
      }`}
      onClick={handleClick}
      disabled={disabled || false}
      aria-label={`${label} ${selected ? "selected" : ""}`}
    >
      {selected && (
        <span role="img" aria-label="selected item">
          <img src={selectedImg} alt="selected" />
        </span>
      )}
      {label}
    </button>
  );
};

export default React.memo(Button);
