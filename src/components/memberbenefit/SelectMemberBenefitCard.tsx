'use client'
import React from 'react'
import Image from 'next/image'
import Button from '@/components/atomic/button/Button'
import Modal from '../atomic/modal/Modal'
import { useState } from 'react'
import CheckIcon from "@/icons/check-icon.svg"
import DeviceDetector from "device-detector-js";
import { PlusIcon } from '@radix-ui/react-icons'
import { MemberBenefit } from '@prisma/client'
import LocationIcon from '@/icons/landing/location-icon.svg'
import { cn } from '@/utils/cn'

interface SelectMemberBenefitCardProps {
    key: string
    benefit: MemberBenefit
    onClick: () => void
    selected: boolean
    className?: string
}


const SelectMemberBenefitCard = ({ key, benefit, onClick, selected, className }: SelectMemberBenefitCardProps) => {

    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const deviceDetector = new DeviceDetector()

    const handleClick = async () => {
        setLoading(true)
        try {
            await onClick()
        } catch (error) {
            console.error(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    const image = benefit.imageURL && `${benefit.imageURL}` || `/images/dummy_logo.svg`

    return (
        <>

            <div key={key} className={cn(`card flex font-satoshi flex-col flex-shrink-0 max-w-[310px] min-w-[310px] md:max-w-[340px] md:min-w-[340px] w-10/12    h-full   overflow-hidden  bg-base-100 
        rounded-[10px] shadow-sm`, className)}>
                <div className="p-5 flex-shrink-0">
                    <div className='flex justify-between items-start'>
                        <figure className='relative  w-20 h-20 flex-shrink-0 mb-4 rounded-[14px] border border-[#EBEBEB]'><Image className='duration-300 ease-in-out' src={image} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                        {benefit.offer && <div className='py-1 px-2 text-black  font-bold font-satoshi leading-normal text-xs  bg-primary rounded-[40px] '>{benefit.offer?.substring(0, 30)}</div>}
                    </div>

                    <h2 className="card-title mt-4 text-[20px]  text-black font-satoshi font-black">{benefit.title}</h2>
                    {benefit.description && <p className='text-black mt-2 text-sm min-h-[50px]'>{benefit.description?.length > 60 ? `${benefit.description.substring(0, 60)}...` : benefit.description}</p>}
                    <div className='flex  items-center justify-start mb-4 mt-4 text-category-card-autor '>
                        <div className='flex flex-col items-start justify-start gap-4'>
                            <a href={`https://${benefit.domain}`} rel="noreferrer" target='_blank' className='cursor-pointer text-sm text-link-color underline'>{benefit.domain}</a>

                        </div>
                    </div>
                    <div className='flex justify-between mt-6 gap-2 items-center'>
                        <Button
                            loading={loading}
                            icon={selected ? <CheckIcon width="20" height="20" /> : <PlusIcon width="20" height="20" />}
                            onClick={handleClick}
                            variant="secondary"
                            className='py-[6px] pl-[12px] pr-[16px] gap-1'
                        >{selected ? "Added" : "Add to dealbook"}</Button>

                        {benefit.link && <a href={benefit.link || ""} target='_blank' rel="noreferrer" className='cursor-pointer text-[#8C8C8C] text-xs  md:text-sm  items-end flex-row flex gap-1'>
                            <LocationIcon width="20" height="20" />
                            <span>{benefit.location || ""}</span></a>}
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
                            className="btn-primary hover:cursor-pointer w-full py-[6px] pl-[12px] pr-[16px] "
                            variant="secondary"
                        >Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SelectMemberBenefitCard