'use client'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import Typography from '@/components/atomic/typography/Typography'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import OnboardingModal from '@/components/molecules/onboarding-modal/OnboardingModal'
import siteUrls from '@/config/site-config'
import ContentSection from '@/containers/layout/ContentSection'
import { useTranslation } from '@/lib/i18n/client'
import { MemberBenefitFilter, SelectedMemberBenefit, selectMemberBenefitFilter } from '@/lib/types'
import { cn } from '@/utils/cn'
import { Category, MemberBenefit } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import GeneratePageModal from '@/components/molecules/generate-page-modal/GeneratePageModal'
import SelectCategoryScroller from '@/components/categoryscroller/SelectCategoryScroller'
import { v4 } from "uuid";
interface OnboardingContainerProps {
    benefits: MemberBenefit[]
    categories: Category[]
}



const OnboardingContainer = ({ benefits, categories }: OnboardingContainerProps) => {
    const [showGeneratePageModal, setShowGeneratePageModal] = useState(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(true)
    const { t } = useTranslation('onboarding')
    const { t: landingT } = useTranslation('landing')
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [loading, setLoading] = useState(false);

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
            <ContentSection fullWidth additionalClassName={cn(' fixed  bg-landing-background z-50 top-0 pt-8 lg:pt-10 pb-2 lg:pb-4')}>
                <div className='flex flex-row  gap-2 justify-between items-center '>

                    <Link href={siteUrls.general.home}>
                        <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='w-[118px] h-[25px] lg:w-[150px] lg:h-[50px]' />

                    </Link>
                    <div className='flex gap-2' >
                        <Button
                            variant='secondary'
                            className='py-[6px] px-3 lg:py-[14px] lg:px-5  !min-w-[100px]'
                            label={landingT('navbar.login')}
                            size='sm'
                            onClick={() => router.push(siteUrls.general.login)}
                        />
                        <Button
                            label={`Generate Dealbook ${selectedBenefits.filter(s => s.selected).length > 0 ? `(${selectedBenefits.filter(s => s.selected).length})` : ""}`}
                            size={'sm'}
                            className='py-[6px] px-3 lg:py-[14px] lg:px-5'
                            onClick={() => {
                                // router.push(`/register?clientId=${clientSlug}&selectedBenefits=${encodeURIComponent(`${selectedBenefits.filter(s => s.selected).map(b => b.id).join(",")}`)}`)
                                if (selectedBenefits.filter(s => s.selected).length == 0) {
                                    customToast.warn("Please select at least one deal.")
                                    return
                                }
                                setShowGeneratePageModal(true)
                            }}

                        />
                    </div>
                </div>
            </ContentSection >
            <div className='w-full overflow-hidden'>

                <div className=' py-20 w-full mx-auto '>
                    <div className='max-w-[1200px] px-4 md:px-28 mx-auto lg:mt-40'>
                        <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 md:gap-5 text-center'>
                            <Typography type="h1" className="font-black" >{t(`step${step}.title`)}</Typography>
                            <Typography type="h6" className="text-xl lg:text-2xl" >{t(`step${step}.description`)}</Typography>
                        </div>
                    </div>
                    <div className='pt-8 lg:pt-20  '>
                        <div className="flex flex-col md:flex-row gap-4   items-start justify-between w-full  text-black md:items-center  max-w-[1440px] px-4 md:px-28 mx-auto">
                            <h1 className="text-xl lg:text-2xl font-bold">Featured Deals</h1>
                            {/* <div className='tabs bg-[#F0F0F0]  p-1  w-full md:w-fit flex flex-shrink-0 justify-between lg:justify-center  gap-2 rounded-[10px]'>

                                {Object.keys(selectMemberBenefitFilter).map((key: string, index) => {
                                    return (
                                        <div key={index} className={`px-4  py-2 text-[#5E5E5E] w-full text-center font-satoshiBold font-medium text-sm lg:text-base rounded-lg cursor-pointer ${selectedDisplayType === selectMemberBenefitFilter[key as MemberBenefitFilter] ? 'bg-white' : ''}`} onClick={() => setSelectedDisplayType(selectMemberBenefitFilter[key as MemberBenefitFilter])}>
                                            {selectMemberBenefitFilter[key as MemberBenefitFilter]}
                                        </div>
                                    )
                                })}
                            </div> */}
                        </div>
                        <div className='mb-40 '>
                            <>
                                {selectedDisplayType == selectMemberBenefitFilter.CATEGORY && categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId).length > 0).map((category) => {
                                    return (
                                        <SelectCategoryScroller
                                            key={category.id}
                                            category={category}
                                            selectedBenefits={selectedBenefits.filter((benefit: SelectedMemberBenefit) => benefit.categoryId === category.id)}
                                            setSelectedBenefits={(categorySelectedBenefits) => {
                                                setSelectedBenefits(selectedBenefits.map(benefit => {
                                                    const categoryBenefit = categorySelectedBenefits.find(cb => cb.id === benefit.id)
                                                    if (categoryBenefit) {
                                                        return categoryBenefit
                                                    }
                                                    return benefit
                                                }))

                                            }}
                                        />
                                    )
                                })}

                                {[selectMemberBenefitFilter.NEW].includes(selectedDisplayType) && (
                                    <div className='grid grid-cols-1  justify-items-stretch lg:justify-items-center md:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-5 mt-8  max-w-[1440px] px-4 md:px-28 mx-auto '>
                                        {selectedBenefits && selectedBenefits
                                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                            .map((benefit: SelectedMemberBenefit, index: any) => (
                                                <SelectMemberBenefitCard
                                                    selected={benefit.selected}
                                                    onClick={() => {
                                                        const newSelectedBenefits = selectedBenefits.map(b => b.id === benefit.id ? { ...b, selected: !b.selected } : b)
                                                        setSelectedBenefits(newSelectedBenefits)
                                                    }}
                                                    key={index} benefit={benefit}
                                                    className='w-full min-w-32 max-w-full md:min-w-32 md:max-w-full'
                                                />
                                            ))}
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>

                {showOnboardingModal && (
                    <OnboardingModal
                        onClose={() => {
                            setShowOnboardingModal(false)
                        }}
                        isOpen={showOnboardingModal}
                    />
                )}
                {showGeneratePageModal && (
                    <GeneratePageModal
                        onClick={() => {
                            setShowGeneratePageModal(false)
                            router.push(`/register?selectedBenefits=${encodeURIComponent(`${selectedBenefits.filter(s => s.selected).map(b => b.id).join(",")}`)}&clientId=${v4()}`)
                        }}
                        selectedBenefits={selectedBenefits.filter(s => s.selected)}
                        onClose={() => {
                            setShowGeneratePageModal(false)
                        }}
                        isOpen={showGeneratePageModal}
                    />
                )}
            </div >
        </div >
    )
}

export default OnboardingContainer