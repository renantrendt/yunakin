'use client'
import { BlogsViewModel } from '@/app/(landing)/blogs/page'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import siteUrls from '@/config/site-config'
import Button from '@/components/atomic/button/Button'
import Modal from '../atomic/modal/Modal'
import { useState } from 'react'
import CheckIcon from "@/icons/check-icon.svg"
import { upsertMemberBenefitLinkClick } from '@/app/actions'
import DeviceDetector from "device-detector-js";
import { Category, MemberBenefit, MemberBenefitPageConfig, OtherMemberBenefit } from '@prisma/client'
import { MemberBenefitClickType } from '@/lib/types'

interface MemberBenefitCardProps {
    key: string
    benefit: MemberBenefit
    otherMemberbenefit?: OtherMemberBenefit
    createMode?: boolean
    trackAnalytics?: boolean
    config?: MemberBenefitPageConfig
}
const MemberBenefitCard = ({ key, benefit, config, otherMemberbenefit, trackAnalytics = true }: MemberBenefitCardProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const deviceDetector = new DeviceDetector()

    const handleButtonClick = async (memberBenefitId: string, event: MemberBenefitClickType) => {
        const device = deviceDetector.parse(navigator.userAgent || window.navigator.userAgent)
        // Rest of the code...

        const isClicked = Boolean(localStorage.getItem(`${memberBenefitId}-${event}`));
        if (isClicked) {
            return;
        }

        // memberbenefitlinkclick row in the table
        try {
            if (trackAnalytics) {
                await upsertMemberBenefitLinkClick({
                    memberBenefitId,
                    otherMemberBenefitId: otherMemberbenefit?.id,
                    device: (device.device?.type as string),
                    browser: device.client?.name,
                    os: device.os?.name,
                    event: event
                });
                localStorage.setItem(`${memberBenefitId}-${event}`, 'true');
            }
        } catch (error) {

        }
    }
    const timeStamp = new Date().getTime()


    const domain = benefit.domain.includes('http') ? benefit.domain : `https://${benefit.domain}`

    const image = benefit.imageURL && `${benefit.imageURL}?${timeStamp}` || undefined
    return (
        <>

            <div key={key} className="card w-full max-w-[285px] dark:text-white dark:bg-card-dark min-w-[270px] h-full flex-1    overflow-hidden  last:mr-4 lg:last:mr-0 bg-base-100 col-span-4  
        rounded-[10px] shadow-sm">
                <div className="px-6 pt-6 pb-6 flex flex-col  ">
                    <figure className='relative hidden w-20 h-20 flex-shrink-0 mb-4 rounded-[14px] border border-[#EBEBEB]'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${benefit.imageURL || "https://images.pexels.com/photos/19560953/pexels-photo-19560953/free-photo-of-white-cherry-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}`} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                    <h2 className="card-title  text-2xl font-bold mb-2">{benefit.title}</h2>
                    {benefit.description && <p className='text-neutral-600 dark:text-sidebar-icon-dark text-base min-h-[50px]'>{benefit.description?.length > 60 ? `${benefit.description.substring(0, 60)}...` : benefit.description}</p>}
                    {/* <p className='text-neutral-600 font-black dark:text-sidebar-icon-dark text-base min-h-[50px]'>{benefit.offer}</p> */}
                    <div className='flex  items-center justify-start my-4 text-category-card-autor dark:text-sidebar-icon-dark text-xs'>
                        <div className='flex flex-col items-start justify-start gap-4'>

                            <a href={domain} target='_blank' className='cursor-pointer text-link-color underline'
                                onClick={() => {
                                    handleButtonClick(benefit.id, MemberBenefitClickType.WEBSITE_CLICK)
                                }}
                            >{benefit.domain}</a>
                            {benefit.link && <a target='_blank' href={benefit.link}
                                onClick={() => {
                                    handleButtonClick(benefit.id, MemberBenefitClickType.LOCATION_CLICK)
                                }}
                                className='cursor-pointer text-link-color underline'>{benefit.location}</a>}
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                setIsModalOpen(true)
                                handleButtonClick(benefit.id, MemberBenefitClickType.SAVE_BENEFIT)
                                // save analytics data
                            }}
                            style={{
                                backgroundColor: config?.buttonColor as string,
                            }}
                            variant="secondary"

                        >Save Benefit</Button>
                    </div>
                </div>
            </div >
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='flex flex-col  p-6 justify-center items-stretch '>
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
                            onClick={() => {

                                const domain = benefit.domain.includes('http') ? benefit.domain : `https://${benefit.domain}`
                                window.open(`${benefit.domain}`, '_blank')
                                handleButtonClick(benefit.id, MemberBenefitClickType.CLAIM_BENEFIT)
                            }}
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

export default MemberBenefitCard