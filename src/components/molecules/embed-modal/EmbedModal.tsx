import Modal from '@/components/atomic/modal/Modal'
import React from 'react'
import { ArrowLeftIcon, CodeIcon, CopyIcon, Cross1Icon } from "@radix-ui/react-icons"
import Typography from '@/components/atomic/typography/Typography';
import customToast from '@/components/atomic/toast/customToast';
import { Share2Icon } from "@radix-ui/react-icons"
import EmbedIcon from '@/icons/editor/embed-icon.svg'
import CustomizeUrlIcon from '@/icons/editor/customize-url-icon.svg'
import ShareUrlIcon from '@/icons/editor/share-url-icon.svg'
import Button from '@/components/atomic/button/Button';
import BackIcon from '@/icons/BackIcon';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientSlug?: string;
}



const EmbedModal = ({ clientSlug, isOpen, onClose }: EmbedModalProps) => {
    const [showEmbedCode, setShowEmbedCode] = React.useState(false);
    const [showShareUrl, setShowShareUrl] = React.useState(false);
    const [showCustomizeUrl, setShowCustomizeUrl] = React.useState(false);
    const content = `
        <div class="yunakin-iframe-container" style="width:100%">
            <iframe id="yunakin_frame" src='https://yunakin.com/${clientSlug}/memberbenefits?embedded=true' width='100%' height='1000' frameborder='0' scrolling='no'></iframe>
        </div>
        <script data-client-slug="${clientSlug}" >
            window.addEventListener('message', (event) => {
                    if (event.data && event.data.type === 'yunakin_iframeHeight') {
                        const iframe = document.getElementById('yunakin_frame');
                        if (iframe) {
                            iframe.style.height = event.data.height + 'px';
                        }
                    }
                });
        </script>`;
    const handleClick = () => {

        navigator.clipboard.writeText(content)
        customToast.success('Copied to clipboard')
    }
    return (

        <Modal isOpen={isOpen} onClose={onClose}
        >
            <div className='flex flex-col gap-6 p-8 justify-start content font-satoshi'>
                <div className='justify-between flex w-full'>
                    <Button onClick={onClose} variant='secondary' size='sm' icon={<Cross1Icon />} className=' absolute !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  right-8 top-8' />
                </div>
                {!showEmbedCode && !showShareUrl && !showCustomizeUrl &&
                    <>
                        <div>
                            <div className='flex'>
                                <Share2Icon width={24} height={24} />
                                <Typography type='h3'>Share</Typography>
                            </div>
                            <Typography type='p'>Use the options below to share your perks with others.</Typography>
                        </div>
                        <div className="list flex flex-col gap-4">
                            <div
                                onClick={() => setShowEmbedCode(true)}
                                className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <EmbedIcon width={24} height={24} className="relative top-[2px]" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>Embed</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] font-medium'>Copy the code to embed it directly into your site.e</Typography>
                                </div>
                            </div>
                            <div className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <ShareUrlIcon width={24} height={24} className="relative top-[2px]" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>URL</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] font-medium'>Copy the URL to your clipboard.</Typography>
                                </div>
                            </div>
                            <div className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <CustomizeUrlIcon width={24} height={24} className="relative top-[2px]" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>Customize URL</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] font-medium'>Customize your URL according to your preference.</Typography>
                                </div>
                            </div>

                        </div>
                    </>
                }
                {showEmbedCode && (
                    <>
                        <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => setShowEmbedCode(false)} >
                            <ArrowLeftIcon />
                            <Typography type='p'>Back</Typography>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className='flex items-center gap-2'>
                                <CodeIcon width={24} height={24} />
                                <Typography type='p' className='text-xl'>Embed Code</Typography>
                            </div>
                            <Typography type='p' className='text-[#5E5E5E]'>Copy the code below to embed it directly into your site.</Typography>

                        </div>
                        <div className='flex flex-col items-center gap-6'>
                            <div className='bg-[#F5F5F5]  py-3 px-3 rounded-lg'>
                                <Typography type='p' className='text-black'>{content}</Typography>
                            </div>
                            <Button
                                onClick={handleClick}
                                icon={<CopyIcon />}
                                variant='primary'
                                size='md'
                                label='Copy'
                                className='w-full' />
                        </div></>
                )}

            </div>
        </Modal>
    )
}

export default EmbedModal