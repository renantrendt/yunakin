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
import PlusIcon from '@/icons/PlusIcon'
import { MemberBenefit } from '@prisma/client'

interface SelectMemberBenefitCardProps {
    key: string
    benefit: MemberBenefit
    onClick: () => void
    selected: boolean
}
const SelectMemberBenefitCard = ({ key, benefit, onClick, selected }: SelectMemberBenefitCardProps) => {


    const [isModalOpen, setIsModalOpen] = useState(false)
    const deviceDetector = new DeviceDetector()
    return (
        <>

            <div key={key} className="card w-full flex flex-col flex-shrink-0 dark:text-white dark:bg-card-dark min-w-[200px]  h-full   overflow-hidden max-w-[320px] last:mr-4 lg:last:mr-0 bg-base-100 col-span-4  
        rounded-[10px] shadow-sm">
                <figure className='relative hidden max-h-[176px] flex-shrink-0'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${benefit.imageURL || "https://images.pexels.com/photos/19560953/pexels-photo-19560953/free-photo-of-white-cherry-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}`} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                <div className="px-6 pt-6 pb-6 flex-shrink-0">
                    <h2 className="card-title text-2xl font-bold mb-2">{benefit.title}</h2>
                    <p className='text-neutral-600 dark:text-sidebar-icon-dark text-base'>{benefit.description}</p>
                    <div className='flex  items-center justify-start my-4 text-category-card-autor dark:text-sidebar-icon-dark text-xs'>
                        <div className='flex flex-col items-start justify-start gap-4'>
                            <a href={`https://${benefit.domain}`} target='_blank' className='cursor-pointer text-primary-500 underline'>{benefit.domain}</a>
                            <a href={benefit.link || ""} target='_blank' className='cursor-pointer text-primary-500 underline'>{benefit.location || ""}</a>
                        </div>
                    </div>
                    <div>
                        <Button
                            icon={selected ? <CheckIcon /> : <PlusIcon />}
                            onClick={onClick}
                            className="btn-primary text-primary-600 hover:cursor-pointer"
                            variant="secondary"
                        >Save Benefit</Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='flex flex-col  p-6 justify-center items-stretch '>
                    <div className='p-2 w-fit mx-auto rounded-lg text-primary-500 bg-gradient-to-b from-[#EAE9FE] to-[#D6D5FF]'>
                        <CheckIcon />
                    </div>
                    <div className='flex flex-col items-center mt-6 mb-8 gap-2'>
                        <h2 className='text-base text-black font-medium'>Benefit saved!</h2>
                        <p className='text-center text-sm text-grey-600 '>Apply the code: {benefit.code} on checkout</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Button
                            onClick={() => {
                                window.open(`https://${benefit.domain}`, '_blank')
                            }}
                            className="btn-primary hover:cursor-pointer"
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

export default SelectMemberBenefitCard