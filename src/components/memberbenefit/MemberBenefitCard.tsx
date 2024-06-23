'use client'
import { BlogsViewModel } from '@/app/(landing)/blogs/page'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import siteUrls from '@/config/site-config'
import { MemberBenefit } from '@/lib/types'
import Button from '@/components/atomic/button/Button'
interface MemberBenefitCardProps {
    key: string
    benefit: MemberBenefit
}
const MemberBenefitCard = ({ key, benefit }: MemberBenefitCardProps ) => {
    return (
        <div key={key} className="card w-full dark:text-white dark:bg-card-dark min-w-[324px] h-full   overflow-hidden max-w-lg  last:mr-4 lg:last:mr-0 bg-base-100 col-span-4  
        rounded-[10px] shadow-sm">
                    <figure className='relative hidden max-h-[176px]'><Image className='hover:scale-105 duration-300 ease-in-out' src={`${benefit.imageURL}`} alt="Benefit" width={520} height={360} objectFit=' contain' /></figure>
                    <div className="px-6 pt-6 pb-2">
                        <h2 className="card-title text-2xl font-bold mb-2">{benefit.title}</h2>
                        <p className='text-neutral-600 dark:text-sidebar-icon-dark text-base'>{benefit.description}</p>
                        <div className='flex  items-center justify-start my-4 text-category-card-autor dark:text-sidebar-icon-dark text-xs'>
                            <div className='flex flex-col items-start justify-start gap-4'>
                                <a href={`https://${benefit.domain}`} target='_blank' className='cursor-pointer text-primary-500 underline'>{benefit.domain}</a>
                                <a href={benefit.link} target='_blank' className='cursor-pointer text-primary-500 underline'>{benefit.location}</a>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    // handleSaveBenefit(benefit.id)
                                }}
                                className="btn-primary hover:cursor-pointer"
                                variant="primary"

                            >Save Benefit</Button>
                        </div>
                    </div>
        </div>
    )
}

export default MemberBenefitCard