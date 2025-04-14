import { useState } from "react";
import Button from "../Button";
import "./styles.scss";

export interface SegmentButtonProps {
  buttons: {
    id: string;
    label: string;
    disabled?: boolean;
  }[];
  multiple?: boolean;
  onChange?: (selected: string[]) => void;
}
const SegmentButton = (props: SegmentButtonProps) => {
  const { buttons, multiple = false, onChange = () => {} } = props;

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const handleClickButton = (id: string) => {
    if (multiple) {
      if (selectedButtons.includes(id)) {
        setSelectedButtons((prev) => prev.filter((item) => item !== id));
      } else {
        setSelectedButtons((prev) => [...prev, id]);
      }
    } else {
      setSelectedButtons([id]);
    }
    onChange(selectedButtons);
  };

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div className="segment-button">
      {buttons.map((button) => (
        <Button
          key={button.id}
          onClick={() => handleClickButton(button.id)}
          selected={selectedButtons.includes(button.id)}
          {...button}
        ></Button>
      ))}
    </div>
  );
};

export default SegmentButton;
