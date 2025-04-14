interface SegmentButtonProps {
  buttons: {
    label: string;
    id: string;
    disabled?: boolean;
  }[];
}
const SegmentButton = ({ buttons }: SegmentButtonProps) => {
  console.log(buttons);
  return <button>test</button>;
};

export default SegmentButton;
