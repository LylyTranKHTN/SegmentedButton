import SegmentButton, { SegmentButtonProps } from "../components/SegmentButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<SegmentButtonProps> = {
  title: "Core/SegmentButton",
  component: SegmentButton,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Single: Story = {
  args: {
    buttons: [
      {
        id: "1",
        label: "Button 1",
      },
      {
        id: "2",
        label: "Button 2",
      },
      {
        id: "3",
        label: "Button 3",
      },
      {
        id: "4",
        label: "Button 4",
        disabled: true,
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    buttons: [
      {
        id: "1",
        label: "Button 1",
      },
      {
        id: "2",
        label: "Button 2",
      },
      {
        id: "3",
        label: "Button 3",
      },
      {
        id: "4",
        label: "Button 4",
        disabled: true,
      },
    ],
  },
};
