"use client";
import Modal from '@/components/atomic/modal/Modal';
import React from 'react'
import { MemberBenefitWithImport, } from '@/lib/types';
import { useTranslation } from '@/lib/i18n/client';
import _ from 'lodash';
import { CheckCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Typography from '@/components/atomic/typography/Typography';
import LocationIcon from "@/icons/landing/location-icon.svg"
import Toggle from '@/components/atomic/toggle/Toggle';
import Badge from '@/components/atomic/badge/Badge';

interface ViewBenefitDetailsModalProps {
    onClose: () => void;
    memberBenefit: MemberBenefitWithImport;
    isOpen: boolean;
    category: string;
}

const ViewBenefitDetailsModal = ({ onClose, memberBenefit, isOpen, category }: ViewBenefitDetailsModalProps) => {
    const { t } = useTranslation("dashboard")

    const image = memberBenefit.imageURL && `${memberBenefit.imageURL}` || `/images/dummy_logo.svg`
    return (
        <Modal isOpen={isOpen} onClose={onClose}
            closeOnOutsideClick={false}
            className='lg:max-w-[935px] w-full p-0 max-h-[100vh] rounded-none lg:rounded-xl '
        >
            <div className='flex flex-col '>
                <div className='justify-between flex w-full'>
                    <Cross1Icon onClick={onClose} className=' absolute cursor-pointer !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  right-3 top-3 lg:right-8 lg:top-8' />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 '>
                    <div className='flex flex-col justify-between gap-12 h-full p-10'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between items-start'>
                                <Image className='hover:scale-105  w-20 h-20 flex-shrink-0 rounded-[14px] border border-[#EBEBEB] duration-300 ease-in-out' src={image} alt="Benefit" width={80} height={80} objectFit=' contain' />
                                {memberBenefit.offer && <div className='py-1 px-2 text-[#808080] font-bold font-satoshi leading-normal text-xs  md:text-sm bg-[#F5F5F5] rounded-[40px] ' >{memberBenefit.offer?.substring(0, 30)}</div>}
                            </div>
                            <h2 className="card-title mt-4 text-[20px]  text-black font-satoshiBlack font-black"
                            >{memberBenefit.title}</h2>
                            {memberBenefit.description && <p className='max-w-[300px] text-sm mt-6 min-h-[50px]'
                            >{memberBenefit.description}</p>}
                        </div>
                        <div className='details flex justify-between'>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Website</Typography>
                                <a href={memberBenefit.domain} rel="noreferrer" target='_blank' className='cursor-pointer font-satoshi text-sm text-link-color underline'>{memberBenefit.domain}</a>
                            </div>
                            {memberBenefit.location && <div className='flex flex-col gap-2'>
                                <Typography type='p'>Location</Typography>
                                <div className='flex flex-row gap-2'>
                                    <LocationIcon className='w-4 h-4' />
                                    <Typography type='p'>{memberBenefit.location}</Typography>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-10 p-10 bg-[#F8F7F7] font-satoshi'>
                        <div className='flex flex-col items-start gap-10'>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Category</Typography>
                                <Typography type='p' className='text-sm'>{category}</Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Featured</Typography>
                                <Toggle onChange={() => { }} checked={true} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Suggested Deal</Typography>
                                <div className='flex gap-2 items-start'>
                                    <div className='text-[#00CE21]'>

                                        <CheckCircledIcon width={18} height={18} />
                                    </div>
                                    <span>Yes</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Code</Typography>
                                <Typography type='p' className='text-sm'>{memberBenefit.code}</Typography>
                            </div>
                        </div>
                        <div className='flex flex-col items-start gap-10'>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Import</Typography>
                                <Toggle onChange={() => { }} checked={memberBenefit.import ?? false} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Needs Approval</Typography>
                                <div className='flex gap-2  flex-row items-center'>
                                    <div className='text-[#00CE21]'>

                                        <CheckCircledIcon width={18} height={18} />
                                    </div>
                                    <Typography type='p' className='text-sm'>Yes</Typography>

                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography type='p'>Partnership Types</Typography>
                                <div className='flex gap-2 items-start'>
                                    {memberBenefit.partnershipTypes?.split(',').map((type, index) => (
                                        <Badge key={index} color='green' type={'filled'} className='text-xs'>{type}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default ViewBenefitDetailsModal