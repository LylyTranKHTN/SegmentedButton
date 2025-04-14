import "./styles.scss";
import selectedImg from "../../assests/selected.svg";

export interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  selected: boolean;
}

const Button = ({ id, label, onClick, disabled, selected }: ButtonProps) => {
  return (
    <button
      id={id}
      className={
        selected ? "segment-button-item-selected" : "segment-button-item"
      }
      onClick={onClick}
      disabled={disabled || false}
      aria-label={`${label} ${selected && "selected"}`}
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

export default Button;
