'use client'
import PageTracker from '@/components/analytics/pagetracker/PageTracker'
import Button from '@/components/atomic/button/Button'
import Typography from '@/components/atomic/typography/Typography'
import CategoryScroller from '@/components/categoryscroller/CategoryScroller'
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard'
import PageHeader from '@/components/memberbenefit/PageHeader'
import ContentSection from '@/containers/layout/ContentSection'
import { MemberBenefitFilter, OtherMemberBenefitWithMemberBenefit, selectMemberBenefitFilter } from '@/lib/types'
import { Category, MemberBenefit, MemberBenefitPageConfig, OtherMemberBenefit } from '@prisma/client'
import { PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import siteUrls from '@/config/site-config'
import InputField from '@/components/atomic/input/InputField'
import useDebounce from '@/hooks/useDebounce'
import { searchBenefitsSemantically } from '@/app/actions'
import MagnifyingGlass from '@/icons/magnifying-glass.svg'

interface MemberBenefitsPageContainerProps {
    config: MemberBenefitPageConfig
    benefits: MemberBenefit[]
    categories: Category[]
    otherBenefits: OtherMemberBenefitWithMemberBenefit[]
}


const MemberBenefitsPageContainer = ({ config, benefits, otherBenefits, categories }: MemberBenefitsPageContainerProps) => {
    const searchParams = useSearchParams()
    const [selectedBenefits, setSelectedBenefits] = useState<MemberBenefit[]>(benefits)
    const [selectedDisplayType, setSelectedDisplayType] = useState<string>(selectMemberBenefitFilter.NEW)
    const image = config.imageURL || "/images/logo.svg"
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)
    const debouncedValue = useDebounce(search)


    useEffect(() => {
        (async () => {
            if (!searched) {
                if (!debouncedValue && debouncedValue === '') {
                    setSelectedBenefits(benefits)
                    return
                }
                const filteredBenefitIds = await searchBenefitsSemantically(debouncedValue)
                if (filteredBenefitIds.length > 0) {
                    setSelectedBenefits(selectedBenefits.filter(f => filteredBenefitIds.includes(f.id)))
                }
                setSearched(true)
            }
        })()
    }, [debouncedValue])

    return (
        <ContentSection
            className='max-w-full md:p-0 !p-0 min-h-[100vh] relative pb-40   !py-2 !md:py-6'
            fullWidth style={{
                backgroundColor: config?.backgroundColor as string,
            }}>
            <div className='max-w-full pb-20 lg:pb-40 w-full '>
                <PageTracker config={config} otherBenefits={otherBenefits} />

                <div className=' max-w-[1440px] w-full mx-auto   px-4 md:px-28'>

                    <div className='flex justify-between items-center'>

                        {!searchParams?.get('embedded') && <div className=" w-full text-left ">
                            <Image unoptimized src={image} alt='logo' width={100} height={100} objectFit="contain" className=" min-w-[100px] max-w-[150px]  h-auto w-fit  z-10 " />
                        </div>}
                    </div>

                    <div className='py-16 lg:py-6' >
                        <PageHeader
                            title={config.title}
                            description={config.description}
                            config={config}
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <div className="flex flex-col md:flex-row gap-4  items-start mb-6 justify-between w-full  text-black md:items-center max-w-[1440px]  mx-auto px-4 md:px-28">
                        <div className='flex justify-start gap-5'>

                            <h1 className="text-xl lg:text-2xl font-bold" style={{
                                color: config.textColor as string
                            }}>Deals</h1>
                            {config.suggestDeal && (
                                <Button
                                    style={{
                                        color: config.textColor as string,
                                        backgroundColor: config.cardBackgroundColor as string
                                    }}
                                    onClick={() => {
                                        // to be implemented
                                        window.open(siteUrls.general.onboarding, "_blank")
                                    }}
                                    icon={<PlusIcon />}
                                    className='text-[#7A7A7A] bg-[#EDEDED] rounded-[38px]'

                                    label="Suggest a Deal" variant="tertiary" />
                            )}
                        </div>

                        <div className='tabs bg-[#F0F0F0]  p-1  w-full lg:w-fit flex flex-shrink-0 justify-between lg:justify-center  gap-2 rounded-[10px]'
                            style={{
                                backgroundColor: config.cardBackgroundColor as string
                            }}
                        >

                            {Object.keys(selectMemberBenefitFilter).map((key: string, index) => {
                                return (
                                    <div key={index} className={`px-4  py-2 text-[#5E5E5E] w-full text-center font-satoshiBold font-medium text-sm lg:text-base rounded-lg cursor-pointer ${selectedDisplayType === selectMemberBenefitFilter[key as MemberBenefitFilter] ? 'bg-white' : ''}`} onClick={() => setSelectedDisplayType(selectMemberBenefitFilter[key as MemberBenefitFilter])}
                                        style={{
                                            backgroundColor: selectedDisplayType === selectMemberBenefitFilter[key as MemberBenefitFilter] ? config.buttonColor as string : config.cardBackgroundColor as string,
                                            color: config.textColor as string
                                        }}
                                    >
                                        {selectMemberBenefitFilter[key as MemberBenefitFilter]}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex w-full justify-end mx-auto max-w-[1440px] md:px-28  '>
                        <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                            id='search' value={search} onChange={(e) => {
                                setSearched(false)
                                setSearch(e.target.value)
                            }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2' customLeadingIconClassName='!left-[8px] !top-[14px] '
                            style={{
                                backgroundColor: config.cardBackgroundColor as string,
                                color: config.textColor as string,
                                borderColor: config.textColor as string,
                            }} />
                    </div>
                    <div className=' w-full '>
                        {selectedDisplayType == selectMemberBenefitFilter.CATEGORY && categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId).length > 0).map((category) => {
                            return (
                                <CategoryScroller
                                    category={category}
                                    memberBenefits={selectedBenefits.filter(benefit => category.id == benefit.categoryId)}
                                    config={config}
                                    key={category.id}

                                />
                            )
                        })}

                        {[selectMemberBenefitFilter.NEW].includes(selectedDisplayType) && (
                            <div className='grid grid-cols-1  justify-items-stretch lg:justify-items-center md:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-5 mt-8  max-w-[1440px] px-4 md:px-28 mx-auto '>
                                {selectedBenefits && selectedBenefits
                                    .map((benefit: MemberBenefit, index: any) => (
                                        <MemberBenefitCard
                                            isEditing={false}
                                            config={config}
                                            key={index}
                                            benefit={benefit}
                                            className='w-full min-w-32 max-w-full md:min-w-32 md:max-w-full'
                                            otherMemberbenefit={otherBenefits.find(other => other.memberBenefitId == benefit.id) ?? undefined}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className='footer absolute flex justify-center bottom-8 lg:mb-3'>
                <Typography type='p' className='text-center flex gap-2 '
                    style={{
                        color: config?.textColor as string,
                    }}
                >
                    <span className='font-satoshi font-regular'> Powered by </span><a href='https://www.youakin.com/' rel="noreferrer" target='_blank' className='text-blue-500 underline'>Youakin.com</a>
                </Typography>

                {searchParams?.get('embedded') === 'true' && (
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `
                         window.parent.postMessage({ type: 'youakin_iframeHeight', height: document.body.scrollHeight }, '*')
                    `}}
                    />
                )}
            </div>
        </ContentSection>

    )
}

export default MemberBenefitsPageContainer