'use client'
import { createMemberPageConfigWithoutUser, getMemberPageConfigByClientSlug } from '@/app/actions'
import Badge from '@/components/atomic/badge/Badge'
import Button from '@/components/atomic/button/Button'
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import InputField from '@/components/atomic/input/InputField'
import customToast from '@/components/atomic/toast/customToast'
import Typography from '@/components/atomic/typography/Typography'
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard'
import PageHeader from '@/components/memberbenefit/PageHeader'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import siteUrls from '@/config/site-config'
import ContentSection from '@/containers/layout/ContentSection'
import PlusIcon from '@/icons/PlusIcon'
import { cn } from '@/utils/cn'
import { Category, MemberBenefit } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from 'postcss'
import React, { useState } from 'react'
interface OnboardingContainerProps {
    benefits: MemberBenefit[]
    categories: Category[]
}

interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


const OnboardingContainer = ({ benefits, categories }: OnboardingContainerProps) => {
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [loading, setLoading] = useState(false);
    const [clientSlug, setClientSlug] = useState<string>("")

    const [selectedBenefits, setSelectedBenefits] = useState<SelectedMemberBenefit[]>(
        benefits.map(benefit => {
            return {
                ...benefit,
                selected: false
            }
        })
    )

    return (
        <div className=''>
            <ContentSection fullWidth additionalClassName={cn('  bg-landing-background dark:bg-landing-dark-background  bg-landing-background z-50 ')}>
                {step == 2 && (<div className=' fixed z-40 bottom-0 lg:bottom-[92%] left-0 right-0  lg:top-0 p-3 text-white shadow-xl rounded-xl   bg-landing-dark-background  m-1 lg:mx-4 '>
                    <div className='flex flex-col md:flex-row gap-2 justify-between items-center '>
                        <p className='text-center flex-1 text-sm '>Here is a live preview of your members page</p>
                        <Button label='Save and Customize' onClick={() => {
                            router.push(`/register?clientId=${clientSlug}&selectedBenefits=${encodeURIComponent(`${selectedBenefits.filter(s => s.selected).map(b => b.id).join(",")}`)}`)
                        }} />
                    </div>
                </div>)}
            </ContentSection >
            <div className='max-w-[1440px] pb-20 lg:py-12 w-full mx-auto px-4 md:px-28'>
                <div className='px-4 md:px-0'>
                    <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5 text-center'>
                        <Typography type="h1" className="font-black text-[32px] leading-[45px] lg:text-5xl" >Choose the benefits you want to offer</Typography>
                        <Typography type="p" className="text-base text-neutral-600 font-normal lg:text-xl" >Then generate a custom domain for your company</Typography>
                    </div>
                </div>
                <div>
                    {step == 1 && (
                        <div className='mb-40'>
                            <div>
                                {categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId).length > 0).map((category) => {
                                    return (
                                        <div key={category.id} className='flex flex-col gap-3 lg:gap-6 justify-start  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                            <div className=" w-fit	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                                                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                                            </div>
                                            <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                                {selectedBenefits && selectedBenefits.filter((benefit: SelectedMemberBenefit) => benefit.categoryId === category.id).map((benefit: SelectedMemberBenefit, index: any) => (
                                                    // <BlogCard loading={false} key={index} category={category} />
                                                    <SelectMemberBenefitCard
                                                        selected={benefit.selected}
                                                        onClick={() => {
                                                            const newSelectedBenefits = selectedBenefits.map(b => b.id === benefit.id ? { ...b, selected: !b.selected } : b)
                                                            setSelectedBenefits(newSelectedBenefits)
                                                        }}
                                                        key={index} benefit={benefit} />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    )}

                    {step == 2 && (
                        <div>
                            {categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId && benefit.selected).length > 0).map((category) => {
                                return (
                                    <div key={category.id} className='flex flex-col gap-3 lg:gap-6 justify-start  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                        <div className=" w-fit	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                                            <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                                        </div>
                                        <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                            {selectedBenefits && selectedBenefits.filter((benefit: SelectedMemberBenefit) => benefit.categoryId === category.id && benefit.selected).map((benefit: SelectedMemberBenefit, index: any) => (
                                                // <BlogCard loading={false} key={index} category={category} />
                                                <MemberBenefitCard
                                                    category={categories.filter(c => c.id == benefit.categoryId)[0]}
                                                    key={index} benefit={benefit} />
                                            ))}

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    )}
                    {step != 2 && (<div className='fixed transform flex flex-col gap-4  w-full max-w-sm px-4 left-1/2 -translate-x-1/2 bottom-4 bg-white rounded-lg p-4 '>
                        <div className='relative '>
                            <p className='absolute z-20 top-[13px] left-[16px]'>yunakin.com/</p>
                            <InputField
                                name="clientSlug"
                                id="clientSlug"
                                value={clientSlug}
                                onChange={(e) => {
                                    setClientSlug(e.target.value)
                                }}
                                className='!pl-[116px]'
                                placeholder="your_company"
                            />
                        </div>
                        <Button
                            loading={loading}
                            onClick={async () => {
                                setLoading(true)
                                if (selectedBenefits.filter(s => s.selected).length == 0) {
                                    customToast.warn("Please select at least one benefit")
                                    setLoading(false)
                                    return
                                }
                                const memberPageConfig = await getMemberPageConfigByClientSlug(clientSlug)
                                if (memberPageConfig) {
                                    customToast.warn("This slug is already taken. Please choose another one")
                                    setLoading(false)
                                    return
                                }
                                else {
                                    setStep(step + 1)
                                }
                            }}
                            className='w-full'
                            label={"Generate Member Benefit Page"}
                        />
                    </div>
                    )}
                </div>
            </div >
        </div >
    )
}

export default OnboardingContainer