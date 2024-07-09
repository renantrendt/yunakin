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
import OnboardingModal from '@/components/molecules/onboarding-modal/OnboardingModal'
import siteUrls from '@/config/site-config'
import ContentSection from '@/containers/layout/ContentSection'
import PlusIcon from '@/icons/PlusIcon'
import { useTranslation } from '@/lib/i18n/client'
import { MemberBenefitFilter, SelectMemberBenefitFilter, SelectMemberBenenefiFilter, selectMemberBenefitFilter } from '@/lib/types'
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

    const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(true)
    const { t } = useTranslation('onboarding')
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [loading, setLoading] = useState(false);
    const [clientSlug, setClientSlug] = useState<string>("")

    const [selectedDisplayType, setSelectedDisplayType] = useState<string>(selectMemberBenefitFilter.NEW)

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
            <ContentSection fullWidth additionalClassName={cn(' fixed  bg-landing-background z-50  pt-10 pb-4')}>
                <div className='flex flex-col md:flex-row gap-2 justify-between items-center '>
                    <Link href={siteUrls.general.home}>
                        <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                    </Link>
                    <div className='flex justify-between gap-3'>
                        <Button
                            variant='secondary'
                            className='  !min-w-[100px] '
                            label={'Login'}
                            size='lg'
                            onClick={() => router.push(siteUrls.general.login)}
                        />
                        <Button label={`Generate Page ${selectedBenefits.filter(s => s.selected).length > 0 ? `(${selectedBenefits.filter(s => s.selected).length})` : ""}`} size="lg" onClick={() => {
                            router.push(`/register?clientId=${clientSlug}&selectedBenefits=${encodeURIComponent(`${selectedBenefits.filter(s => s.selected).map(b => b.id).join(",")}`)}`)
                        }} />
                    </div>

                </div>
            </ContentSection >
            <div className='max-w-[1440px] pb-20 lg:py-12 w-full mx-auto px-4 md:px-28'>
                <div className='px-4 md:px-0 lg:mt-40'>
                    <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5 text-center'>
                        <Typography type="h1" className="font-black" >{t(`step${step}.title`)}</Typography>
                        <Typography type="h6" className="text-xl" >{t(`step${step}.description`)}</Typography>
                    </div>
                </div>
                <div>
                    <div className="flex  justify-between w-full  text-black items-center">
                        <h1 className="text-2xl font-bold">Perks</h1>
                        <div className='tabs bg-[#F0F0F0] p-1 flex gap-2 rounded-[10px]'>

                            {Object.keys(selectMemberBenefitFilter).map((key: MemberBenefitFilter, index) => {
                                return (
                                    <div key={index} className={`px-4 py-2 rounded-lg cursor-pointer ${selectedDisplayType === selectMemberBenefitFilter[key] ? 'bg-white' : ''}`} onClick={() => setSelectedDisplayType(selectMemberBenefitFilter[key])}>
                                        {selectMemberBenefitFilter[key]}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {step == 1 && (
                        <div className='mb-40'>
                            <div>
                                {selectedDisplayType == selectMemberBenefitFilter.CATEGORY && categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId).length > 0).map((category) => {
                                    return (
                                        <div key={category.id} className='flex flex-col gap-3 lg:gap-5 justify-start  mt-8 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                            <div className=" w-fit	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                                                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                                            </div>
                                            <div className='flex flex-row gap-3 lg:gap-5 justify-items-center  overflow-x-scroll max-w-[100vw]  no-scrollbar '>
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

                                {[selectMemberBenefitFilter.NEW, selectMemberBenefitFilter.FEATURED].includes(selectedDisplayType) && (
                                    <div className='grid grid-cols-3 gap-x-5 gap-y-5 mt-8 '>
                                        {selectedBenefits && selectedBenefits
                                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                            .map((benefit: SelectedMemberBenefit, index: any) => (
                                                <SelectMemberBenefitCard
                                                    selected={benefit.selected}
                                                    onClick={() => {
                                                        const newSelectedBenefits = selectedBenefits.map(b => b.id === benefit.id ? { ...b, selected: !b.selected } : b)
                                                        setSelectedBenefits(newSelectedBenefits)
                                                    }}
                                                    key={index} benefit={benefit} />
                                            ))}
                                    </div>
                                )}
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
                {showOnboardingModal && (
                    <OnboardingModal
                        onClose={() => {
                            setShowOnboardingModal(false)
                        }}
                        isOpen={showOnboardingModal}
                    />
                )}
            </div >
        </div >
    )
}

export default OnboardingContainer