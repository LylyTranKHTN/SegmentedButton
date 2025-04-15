import SegmentButton, { SegmentButtonProps } from "../components/SegmentButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<SegmentButtonProps> = {
  title: "SegmentButton",
  component: SegmentButton,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const CALENDAR_LIST = [
  {
    id: "1",
    label: "Monday",
  },
  {
    id: "2",
    label: "Tuesday",
  },
  {
    id: "3",
    label: "Wednesday",
  },
  {
    id: "4",
    label: "Thursday",
  },
  {
    id: "5",
    label: "Friday",
  },
  {
    id: "6",
    label: "Saturday",
    disabled: true,
  },
  {
    id: "7",
    label: "Sunday",
    disabled: true,
  },
];

export const SingleSelectCalendar: Story = {
  args: {
    buttons: CALENDAR_LIST,
  },
};

export const MultipleSelectCalendar: Story = {
  args: {
    multiple: true,
    buttons: CALENDAR_LIST,
  },
};

export const CalendarWithNotification: Story = {
  args: {
    multiple: true,
    onChange: (selected: string[]) => {
      if (selected.length) {
        const listOfSelected = CALENDAR_LIST.filter((item) =>
          selected.includes(item.id)
        )
          .reduce((acc, item) => {
            return acc + item.label + ", ";
          }, "")
          .slice(0, -2);

        window.alert(`You have selected: ${listOfSelected}`);
      }
    },
    buttons: CALENDAR_LIST,
  },
};
