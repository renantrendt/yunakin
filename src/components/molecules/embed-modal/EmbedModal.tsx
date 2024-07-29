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
import InputField from '@/components/atomic/input/InputField';
import { MemberBenefitPageConfig } from '@prisma/client';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientSlug?: string;
    onUpdate: (property: keyof MemberBenefitPageConfig, value: string | boolean) => void
    loading?: boolean
}


const domain = process.env.NEXT_PUBLIC_NEXT_URL

const EmbedModal = ({ clientSlug, isOpen, onClose, onUpdate, loading }: EmbedModalProps) => {

    const [showEmbedCode, setShowEmbedCode] = React.useState(false);
    const [showShareUrl, setShowShareUrl] = React.useState(false);
    const [showCustomizeUrl, setShowCustomizeUrl] = React.useState(false);
    const [slug, setSlug] = React.useState(clientSlug)
    const content = `
        <div class="youakin-iframe-container" style="width:100%">
            <iframe id="youakin_frame" src='${domain}/${clientSlug}/memberbenefits?embedded=true' width='100%' height='1000' frameborder='0' scrolling='no'></iframe>
        </div>
        <script data-client-slug="${clientSlug}" >
            window.addEventListener('message', (event) => {
                    if (event.data && event.data.type === 'youakin_iframeHeight') {
                        const iframe = document.getElementById('youakin_frame');
                        if (iframe) {
                            iframe.style.height = event.data.height + 'px';
                        }
                    }
                });
        </script>`;
    const handleClick = (value: string) => {
        navigator.clipboard.writeText(value)
        customToast.success('Copied to clipboard')
    }
    return (

        <Modal isOpen={isOpen} onClose={onClose}
            closeOnOutsideClick={false}
        >
            <div className='flex flex-col gap-6 p-8 justify-start content font-satoshi'>
                <div className='justify-between flex w-full'>
                    <Cross1Icon onClick={onClose} className=' absolute cursor-pointer !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  right-8 top-8' />
                </div>
                {!showEmbedCode && !showShareUrl && !showCustomizeUrl &&
                    <>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <Share2Icon width={20} height={20} />
                                <Typography type='h3' className='text-black text-2xl'>Share</Typography>
                            </div>
                            <Typography type='p' className='text-sm text-[#5E5E5E]'>Use the options below to share your perks with others.</Typography>
                        </div>
                        <div className="list flex flex-col gap-4">
                            <div
                                onClick={() => setShowEmbedCode(true)}
                                className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <EmbedIcon width={20} height={20} className="flex-shrink-0" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>Embed</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] text-sm  font-medium'>Copy the code to embed it directly into your site.e</Typography>
                                </div>
                            </div>
                            <div
                                onClick={() => setShowShareUrl(true)}
                                className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <ShareUrlIcon width={20} height={20} className="flex-shrink-0" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>URL</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] text-sm  font-medium'>Copy the URL to your clipboard.</Typography>
                                </div>
                            </div>
                            <div
                                onClick={() => setShowCustomizeUrl(true)}
                                className='w-full  rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex gap-3 justify-start items-start p-3 border-[#EDEDED] border-[1px]'>
                                <CustomizeUrlIcon width={20} height={20} className="flex-shrink-0" />
                                <div className='flex flex-col  gap-2'>
                                    <Typography type='p' className='text-[#121212] font-medium'>Customize URL</Typography>
                                    <Typography type='p' className='text-[#5E5E5E] text-sm font-medium'>Customize your URL according to your preference.</Typography>
                                </div>
                            </div>

                        </div>
                    </>
                }
                {showEmbedCode && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => setShowEmbedCode(false)} >
                            <ArrowLeftIcon />
                            <Typography type='p' className='text-[#5E5E5E] text-sm'>Back</Typography>
                        </div>
                        <div className='flex flex-col justify-start items-start font-satoshi gap-2'>
                            <div className='flex items-center gap-2'>
                                <CodeIcon width={24} height={24} />
                                <Typography type='p' className='text-2xl text-black'>Embed</Typography>
                            </div>
                            <Typography type='p' className='text-[#5E5E5E] text-sm'>Copy the code below to embed it directly into your site.</Typography>

                        </div>
                        <div className='flex flex-col items-center gap-6'>
                            <div className='bg-[#F5F5F5]  py-3 px-3 rounded-lg'>
                                <Typography type='p' className='text-black text-sm'>{content}</Typography>
                            </div>
                            <Button
                                onClick={() => {
                                    handleClick(content)
                                }}
                                icon={<CopyIcon />}
                                variant='primary'
                                size='md'
                                label='Copy'
                                className='w-full' />
                        </div>
                    </div>
                )}
                {showShareUrl && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => setShowShareUrl(false)} >
                            <ArrowLeftIcon />
                            <Typography type='p' className='text-[#5E5E5E] text-sm'>Back</Typography>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className='flex items-center gap-2'>
                                <ShareUrlIcon width={24} height={24} />
                                <Typography type='p' className='text-xl'>URL</Typography>
                            </div>
                            <Typography type='p' className='text-[#5E5E5E]'>Click the button below to copy the URL to your clipboard.</Typography>

                        </div>
                        <div className='flex flex-col items-center gap-6'>
                            <InputField
                                disabled
                                id='shareurl'
                                value={`${domain}/${clientSlug}/memberbenefits`}
                                onChange={() => { }}
                                name='shareurl'
                            />
                            <Button
                                onClick={() => {
                                    handleClick(`${domain}/${clientSlug}/memberbenefits`)
                                }}
                                icon={<CopyIcon />}
                                variant='primary'
                                size='md'
                                label='Copy'
                                className='w-full' />
                        </div>
                    </div>
                )}
                {showCustomizeUrl && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => setShowCustomizeUrl(false)} >
                            <ArrowLeftIcon />
                            <Typography type='p' className='text-[#5E5E5E] text-sm'>Back</Typography>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className='flex items-center gap-2'>
                                <CustomizeUrlIcon width={24} height={24} />
                                <Typography type='p' className='text-xl'>Customize URL</Typography>
                            </div>
                            <Typography type='p' className='text-[#5E5E5E] text-sm'>Feel free to customize it according to your preference.</Typography>

                        </div>
                        <div className='flex flex-col items-center gap-6 '>
                            <div className='relative w-full'>
                                <InputField
                                    id='customizeUrl'
                                    value={`${slug}`}
                                    onChange={(e) => {
                                        setSlug(e.target.value)
                                    }}
                                    name='customizeUrl'
                                    className='pl-[105px]'
                                    error={slug === '' ? 'This field is required' : ''}
                                />
                                <Typography type='p' className='text-[#5E5E5E] text-base absolute left-2 top-[13px]'>youakin.com/</Typography>
                            </div>

                            <Button
                                onClick={() => {
                                    if (slug === '') {
                                        customToast.error('This field is required')
                                    } else {
                                        onUpdate('clientSlug', slug as string)
                                    }
                                }}
                                disabled={clientSlug === slug}
                                loading={loading}
                                variant='primary'
                                size='md'
                                label='Save'
                                className='w-full' />
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default EmbedModal