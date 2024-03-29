import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Modal from './Modal';
import Button from '../button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atomic/Modal',
    component: Modal,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    decorators: [(story: any) => <div> {story()}</div>],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
    },
} satisfies Meta<typeof Modal>;

export default meta;


const ModalWrapper = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className='w-full min-w-[500px] flex justify-center items-center h-96'>
            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            <div className='p-10'>

                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <div className='flex flex-col justify-end gap-2 py-4 px-6  dark:bg-card-dark dark:text-white'>
                        <div>Modal Content</div>
                        <div>Modal Content</div>
                        <div>Modal Content</div>
                        <div>Modal Content</div>
                    </div>

                </Modal>
            </div>

        </div>
    )
}

export const ExampleModal = {
    render: () => <ModalWrapper />
}