import { useState, memo, useCallback, useEffect } from "react";
import Button from "./Button";
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
const SegmentButton = memo((props: SegmentButtonProps) => {
  const { buttons, multiple = false, onChange = () => {} } = props;

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedButtons);
  }, [selectedButtons]);

  const handleClickButton = useCallback(
    (id: string) => {
      if (multiple) {
        if (selectedButtons.includes(id)) {
          setSelectedButtons((prev) => prev.filter((item) => item !== id));
        } else {
          setSelectedButtons((prev) => [...prev, id]);
        }
      } else {
        setSelectedButtons([id]);
      }
    },
    [selectedButtons, onChange, multiple]
  );

  return (
    <div className="segment-button">
      {buttons?.map((button) => (
        <Button
          key={button.id}
          onClick={handleClickButton}
          selected={selectedButtons.includes(button.id)}
          {...button}
        ></Button>
      ))}
    </div>
  );
});

SegmentButton.displayName = "SegmentButton";

export default SegmentButton;
