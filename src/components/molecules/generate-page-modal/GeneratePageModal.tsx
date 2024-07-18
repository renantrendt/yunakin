'use client'
import Button from '@/components/atomic/button/Button'
import Modal from '@/components/atomic/modal/Modal'
import Typography from '@/components/atomic/typography/Typography'
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard'
import { useTranslation } from '@/lib/i18n/client'
import { SelectedMemberBenefit } from '@/lib/types'
import { cn } from '@/utils/cn'
import { MemberBenefit, MemberBenefitPageConfig, OtherMemberBenefit } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import LocationIcon from '@/icons/landing/location-icon.svg'
import { CheckIcon, Cross1Icon, Cross2Icon, CrossCircledIcon } from '@radix-ui/react-icons'
interface DotProps {
    selected: boolean
}


const Dot = ({ selected }: DotProps) => {
    return (
        <div className={cn('dot w-2 h-2 rounded-full bg-[#DBDBDB]', { 'bg-[#121212]': selected })}></div>
    )
}

interface GeneratePageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    selectedBenefits: SelectedMemberBenefit[]
}
interface MinifiedMemberBenefitCardProps {
    key: string
    benefit: MemberBenefit
    otherMemberbenefit?: OtherMemberBenefit
    createMode?: boolean
    trackAnalytics?: boolean
    config?: MemberBenefitPageConfig
    className?: string

}

const MinifiedMemberBenefitCard = ({ key, benefit, config, otherMemberbenefit, trackAnalytics = true, className }: MinifiedMemberBenefitCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div key={key} className={cn(`card flex font-satoshi flex-col flex-shrink-0 w-full md:w-full  md:min-w-[195px]  h-full   overflow-hidden  bg-base-100 
            rounded-[10px] shadow-sm`, className)}>
                <div className="p-3 lg:p-5  flex flex-col  ">
                    <div className='flex justify-between items-start w-full lg:mb-4'>
                        <figure className='relative hidden w-6 h-6 lg:w-10 lg:h-10 flex-shrink-0  rounded-[14px] border border-[#EBEBEB]'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${benefit.imageURL || "https://images.pexels.com/photos/19560953/pexels-photo-19560953/free-photo-of-white-cherry-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}`} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                        {benefit.offer && <div className='py-1 px-2 text-[#808080] text-[7px] lg:text-[8px] font-bold font-satoshi leading-normal    bg-[#F5F5F5] rounded-[40px] '>{benefit.offer?.substring(0, 30)}</div>}
                    </div>
                    <h2 className="card-title mt-0 text-xs  lg:text-[16px]   text-black font-satoshiBlack font-black">{benefit.title}</h2>
                    {benefit.description && <p className='text-[8px] lg:text-[10px] min-h-[35px] lg:min-h-[50px]'>{benefit.description?.length > 60 ? `${benefit.description.substring(0, 60)}...` : benefit.description}</p>}
                    <p className='cursor-pointer text-[8px] min-h-[25px] lg:text-[9px] text-link-color underline'
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >{benefit.domain}</p>
                    <div className='flex justify-between mt-2 items-center'>
                        <Button
                            variant="secondary"
                            size={"sm"}
                            className=' py-[4px] px-2 lg:py-[6px] lg:px-3 text-[8px] lg:text-[9px]'
                            onClick={() => {
                            }}
                        >Save Benefit</Button>

                        {benefit.link && <a className='cursor-pointer w-fit text-[#8C8C8C] text-[8px] items-center  flex '>
                            <span className='flex-shrink-0'>
                                <LocationIcon width="12" height="12" />

                            </span>
                            <span>{benefit.location || ""}</span></a>}
                    </div>
                </div >
            </div >
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalClassName='absolute' className='  min-w-[50px] w-[200px] h-[200px] overflow-hidden  no-scrollbar  items-center'>

                <div className='flex flex-col  p-6 justify-center items-center  mx-auto scale-75 -translate-y-10  '>
                    <div className='p-2 w-fit mx-auto rounded-[20px] bg-[#CCFFD4]'
                        style={{
                            backgroundColor: config?.buttonColor as string,
                            color: config?.textColor as string,
                        }}
                    >
                        <CheckIcon className='text-white  rounded-full  w-6 h-6  bg-[#00CE21]' />
                    </div>
                    <div className='flex flex-col items-center mt-3 mb-4 gap-2'>
                        <h2 className='text-base text-black font-gelica font-medium'>Benefit saved!</h2>
                        <p className='text-center text-[10px] text-grey-600 '>Apply the code: {benefit.code} on checkout</p>
                    </div>
                    <div className='flex flex-col mt-0 w-full gap-2'>
                        <Button
                            className="btn-primary hover:cursor-pointer text-[9px]"
                            style={{
                                backgroundColor: config?.buttonColor as string,
                            }}
                            variant="primary"
                            size={"sm"}

                        >Visit {benefit.title} Website</Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                            className="btn-primary hover:cursor-pointer w-full text-[9px]"
                            variant="secondary"
                            size={"sm"}

                        >Close</Button>
                    </div>
                </div>
            </Modal>
        </>

    )
}

const GeneratePageModal = (props: GeneratePageModalProps) => {
    const { t } = useTranslation('onboarding')
    const [step, setStep] = React.useState(1)

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} className='w-full max-w-full'
            closeOnOutsideClick={false}
        >
            <div className='justify-between flex w-full'>
                <Cross1Icon onClick={onClose} className=' absolute cursor-pointer !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  right-8 top-8' />
            </div>
            <div className='container  flex flex-col  gap-6 px-4 py-8 lg:p-8 justify-center content'>
                <h1 className='text-base font-gelica text-xl leading-[120%] font-semibold'>Public perks page generated.</h1>
                <p className='text-sm leading-[150%]'>Your clients can save those perks and you track the performance of each perk.....</p>
                <div className='figure w-full h-[280px] lg:h-[436px] bg-landing-background overflow-hidden rounded-[18px]   '>
                    <div className='justify-between flex scale-100  w-full px-8 pt-4'>
                        <Image src="/images/logo.svg" alt="logo" width={100} height={20} className='w-[75px] h-[15px] lg:w-[100px] lg:h-[20px]' />
                        <Button label={`Create your perks`} className=' text-[8px] rounded-sm lg:rounded-lg lg:text-[10px] px-1.5 py-[3px] lg:py-[6px] lg:px-3' size={"sm"} />
                    </div>
                    <div className='px-4 pt-3.5 lg:pt-4 '>
                        <div className='  flex flex-col justify-center items-center gap-0 lg:gap-3 text-center'>
                            <Typography type="h1" className="font-black max-w-[200px] text-xs  lg:!text-xl leading-[133%]" >{t(`step${step}.title`)}</Typography>
                            <Typography type="h6" className=" text-[8px] max-w-[200px] lg:!text-xs" >{t(`step${step}.description`)}</Typography>
                        </div>
                    </div>

                    <div className='grid  grid-cols-3 w-full    max-w-[500px]   mx-auto pl-0 pr-4 lg:pr-10  '>
                        {props.selectedBenefits.map((benefit, index) => (
                            <MinifiedMemberBenefitCard
                                key={index.toString()}
                                benefit={benefit}
                                config={props.config}
                                className={cn('min-w-[calc(100vw/3+10px)] scale-75 lg:scale-75', { "-translate-y-1/3 lg:-translate-y-1/4 top-6 lg:top-2": index > 2 })}
                            />
                        ))}
                    </div>
                </div>
                <div className="buttons flex flex-col lg:flex-row justify-center w-full gap-2 lg:mt-4">
                    <Button
                        className='button w-full'
                        onClick={props.onClick}
                        variant='primary'
                        label={'Sign Up'}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default GeneratePageModal;