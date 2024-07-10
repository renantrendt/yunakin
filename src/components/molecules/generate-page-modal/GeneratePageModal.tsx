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
import { CheckIcon } from '@radix-ui/react-icons'
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
            <div key={key} className={cn(`card flex font-satoshi flex-col flex-shrink-0 w-11/12 md:w-full  md:min-w-[195px]  h-full   overflow-hidden last:mr-4 lg:last:mr-0 bg-base-100 
            rounded-[10px] shadow-sm`, className)}>
                <div className="p-5  flex flex-col  ">
                    <div className='flex justify-between items-start'>
                        <figure className='relative hidden w-10 h-10 flex-shrink-0 mb-4 rounded-[14px] border border-[#EBEBEB]'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${benefit.imageURL || "https://images.pexels.com/photos/19560953/pexels-photo-19560953/free-photo-of-white-cherry-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}`} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                        {benefit.offer && <div className='py-1 px-2 text-[#808080] text-[8px] font-bold font-satoshi leading-normal    bg-[#F5F5F5] rounded-[40px] '>{benefit.offer?.substring(0, 30)}</div>}
                    </div>
                    <h2 className="card-title mt-0 text-[16px]  text-black font-satoshiBlack font-black">{benefit.title}</h2>
                    {benefit.description && <p className='text-neutral-600 dark:text-sidebar-icon-dark text-[10px] min-h-[50px]'>{benefit.description?.length > 60 ? `${benefit.description.substring(0, 60)}...` : benefit.description}</p>}
                    <div className='flex  items-center justify-start mt-0 mb-0 text-category-card-autor dark:text-sidebar-icon-dark text-xs'>
                        <div className='flex flex-col items-start justify-start gap-2'>

                            <p className='cursor-pointer text-[9px] text-link-color underline'
                                onClick={(e) => {
                                    e.preventDefault()
                                    // handleButtonClick(benefit.id, MemberBenefitClickType.WEBSITE_CLICK)
                                }}
                            >{benefit.domain}</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-2 items-center'>
                        <Button
                            variant="secondary"
                            size={"sm"}
                            className='text-[10px]'
                            onClick={() => {
                                setIsModalOpen(true)
                                // handleButtonClick(benefit.id, MemberBenefitClickType.SAVE_BENEFIT)
                                // save analytics data
                            }}
                        >Save Benefit</Button>

                        {benefit.link && <a href={benefit.link || ""} target='_blank' className='cursor-pointer text-[#8C8C8C] text-[8px]  flex gap-1'>
                            <LocationIcon width="12" height="12" />
                            <span>{benefit.location || ""}</span></a>}
                    </div>
                </div>
            </div >
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className=''>
                <div className='flex flex-col  p-6 justify-center items-stretch  '>
                    <div className='p-2 w-fit mx-auto rounded-lg'
                        style={{
                            backgroundColor: config?.buttonColor as string,
                            color: config?.textColor as string,
                        }}
                    >
                        <CheckIcon />
                    </div>
                    <div className='flex flex-col items-center mt-6 mb-8 gap-2'>
                        <h2 className='text-base text-black font-medium'>Benefit saved!</h2>
                        <p className='text-center text-sm text-grey-600 '>Apply the code: {benefit.code} on checkout</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Button

                            className="btn-primary hover:cursor-pointer"
                            style={{
                                backgroundColor: config?.buttonColor as string,
                            }}
                            variant="primary"

                        >Visit {benefit.title} Website</Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                            className="btn-primary hover:cursor-pointer w-full"
                            variant="secondary"
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
        <Modal isOpen={props.isOpen} onClose={props.onClose} className='w-full max-w-full' >
            <div className='container  flex flex-col  gap-6 px-4 py-8 lg:p-8 justify-center content'>
                <h1 className='text-base font-gelica text-xl leading-[120%] font-semibold'>Public perks page generated.</h1>
                <p className='text-sm leading-[150%]'>Your clients can save those perks and you track the performance of each perk.....</p>
                <div className='figure w-full h-[350px] lg:h-[436px] bg-landing-background overflow-hidden rounded-[18px]   '>
                    <div className='justify-between flex scale-100  w-full px-8 pt-4'>
                        <Image src="/images/logo.svg" alt="logo" width={100} height={20} className='dark:hidden' />
                        <Button label={`Create your perk    s`} className='text-[10px]' size={"sm"} />
                    </div>
                    <div className='px-4 pt-4 '>
                        <div className='  flex flex-col justify-center items-center gap-3 text-center'>
                            <Typography type="h1" className="font-black max-w-[200px] !text-xl leading-[133%]" >{t(`step${step}.title`)}</Typography>
                            <Typography type="h6" className="!text-xs" >{t(`step${step}.description`)}</Typography>
                        </div>
                    </div>

                    <div className='grid  grid-cols-2 lg:grid-cols-3 w-full    max-w-[500px] mx-auto pl-0 pr-10  '>
                        {props.selectedBenefits.map((benefit, index) => (
                            <MinifiedMemberBenefitCard
                                key={index.toString()}
                                benefit={benefit}
                                className={cn('min-w-[100px] scale-75 !w-32', { "-translate-y-1/4 top-2": index > 2 })}
                            />
                        ))}
                    </div>
                </div>
                <div className="buttons flex justify-center w-full gap-2 mt-8">
                    <Button
                        className='button w-full'
                        onClick={props.onClick}
                        variant='secondary'
                        label='Customize & Share'
                    />
                    <Button
                        className='button w-full'
                        onClick={props.onClick}
                        variant='primary'
                        label={'Create my perks page'}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default GeneratePageModal;