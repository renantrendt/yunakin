import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GoogleIcon from "@/icons/google-icon.svg"
import TwitterIcon from "@/icons/TwitterIcon.svg"
import GithubIcon from "@/icons/git.svg"
import AuthButton from './AuthButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Molecules/AuthButton',
    component: AuthButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof AuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const GoogleAuthButton: Story = {
    args: {
        content: 'Sign in With Google',
        icon: <GoogleIcon />,
    },
};

export const TwitterAuthButton: Story = {
    args: {
        content: 'Sign in With Twitter',
        icon: <TwitterIcon />,
    },
};
export const GithubAuthButton: Story = {
    args: {
        content: 'Sign in With Github',
        icon: <GithubIcon />,
    },
};