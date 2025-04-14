import SegmentButton from "../components/SegmentButton";
import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

const meta = {
    title: 'Core/SegmentButton',
    component: SegmentButton,
    parameters: {},
    tags: ['autodocs'],
} satisfies Meta<typeof SegmentButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {

    }
};

