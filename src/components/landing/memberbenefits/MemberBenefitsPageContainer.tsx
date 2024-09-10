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
import React, { useCallback, useEffect, useState } from 'react'
import siteUrls from '@/config/site-config'
import InputField from '@/components/atomic/input/InputField'
import useDebounce from '@/hooks/useDebounce'
import { searchBenefitsSemantically } from '@/app/actions'
import MagnifyingGlass from '@/icons/magnifying-glass.svg'
import LoadingIcon from '@/icons/LoadingIcon'

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
    const [searchLoading, setSearchLoading] = useState(false)


    useEffect(() => {
        (async () => {
            if (!debouncedValue) {
                setSelectedBenefits(benefits)
            }
        })()
    }, [debouncedValue])
    const handleSearch = useCallback(async () => {

        setSearchLoading(true)
        const filteredBenefitIds = await searchBenefitsSemantically(debouncedValue)
        if (filteredBenefitIds.length > 0) {
            console.log(benefits)
            setSelectedBenefits(benefits.filter(f => filteredBenefitIds.includes(f.id)))
        } else {
            setSelectedBenefits([])
        }
        setSearched(true)
        setSearchLoading(false)
    }, [setSearchLoading, searched, search])
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
                                className='text-[#7A7A7A] bg-[#EDEDED] rounded-[38px] px-2 py-2 lg:py-[10px] lg:px-4'

                                label="Suggest a Deal" variant="tertiary" />
                        )}
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
                    <div className='flex w-full justify-end mx-auto relative max-w-[1440px] px-4 md:px-28  '>
                        <InputField placeholder='' name='search' leadingIcon={searchLoading ? <LoadingIcon size='xs' className='text-black bg-black loading-sm' /> : <MagnifyingGlass />}
                            id='search' value={search} onChange={(e) => {
                                setSearched(false)
                                setSearch(e.target.value)
                            }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2'
                            customLeadingIconClassName='!left-[8px] !top-[13px] !mr-2 ' />

                        <Button
                            className=' absolute right-6 md:right-[120px] top-1'
                            size={"md"}
                            variant={"primary"}
                            onClick={() => {
                                handleSearch();
                            }}
                            style={{
                                backgroundColor: config?.buttonColor as string,
                                color: config?.textColor as string,
                            }}
                            label='Search with AI'
                        />
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