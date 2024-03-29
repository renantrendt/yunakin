import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta = {
    title: "Atomic/Divider",
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        dividerStyle: { control: 'radio', options: ['light', 'heavy'] },
        dividerType: { control: 'radio', options: ['horizontal', 'vertical'] }
    }
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDivider: Story = {
    args: {
        dividerType: 'horizontal',
        dividerStyle: 'light'
    }
};