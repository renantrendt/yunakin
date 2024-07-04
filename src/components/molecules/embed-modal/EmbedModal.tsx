import Modal from '@/components/atomic/modal/Modal'
import React from 'react'
import { CodeIcon, CopyIcon } from "@radix-ui/react-icons"
import Typography from '@/components/atomic/typography/Typography';
import customToast from '@/components/atomic/toast/customToast';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientSlug?: string;
}

const EmbedModal = ({ clientSlug, isOpen, onClose }: EmbedModalProps) => {

    const handleClick = () => {
        navigator.clipboard.writeText(`<iframe src='https://yunakin.com/${clientSlug}/memberbenefits' width='600' height='450' frameborder='0' scrolling='no'></iframe>`)
        customToast.success('Copied to clipboard')
    }
    return (

        <Modal isOpen={isOpen} onClose={onClose}
        >
            <div className='flex flex-col gap-6 p-8 justify-start content'>
                <div className='flex justify-start items-center gap-4'>
                    <CodeIcon width={24} height={24} />
                    <Typography type='p'>Embed Code</Typography>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='bg-gray-400 py-3 px-3'>
                        <Typography type='p' className='text-black'>{`<iframe src='https://yunakin.com/${clientSlug}/memberbenefits' width='600' height='450' frameborder='0' scrolling='no'></iframe>`}</Typography>
                    </div>
                    <div className='flex gap-1  cursor-pointer'

                        onClick={handleClick}
                    >
                        <CopyIcon width={20} height={20} c />
                        <Typography type='p'>Copy</Typography>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default EmbedModal