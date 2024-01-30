import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import AccountIcon from '@/assets/icons/AccountIcon';
import LockOffIcon from '@/assets/icons/LockOffIcon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/InputField',
    component: InputField,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        type: { control: 'text' },
    },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputWithLabel: Story = {
    args: {
        label: 'InputWithLabel',
        name: 'input',
        id: 'input',
        type: 'text',
    },
};

export const InputWithLeadingIcon: Story = {
    args: {
        label: 'InputWithLeadingIcon',
        name: 'input',
        id: 'input',
        type: 'text',
        leadingIcon: <AccountIcon />,
    },
};

export const InputWithTralingIcon: Story = {
    args: {
        label: 'InputWithTralingIcon',
        name: 'input',
        id: 'input',
        type: 'text',
        trailingIcon: <LockOffIcon />,
    },
};
