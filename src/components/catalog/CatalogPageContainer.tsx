'use client'
import { updateOtherMemberBenefits } from '@/app/actions'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import Typography from '@/components/atomic/typography/Typography'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import platformConfig from '@/config/app-config'
import ContentSection from '@/containers/layout/ContentSection'
import { cn } from '@/utils/cn'
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useTranslation } from '@/lib/i18n/client'
interface CatalogPageContainerProps {
    benefits: SelectedMemberBenefit[]
    categories: Category[]
    memberPageConfig: MemberBenefitPageConfig
}

interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


const CatalogPageContainer = ({ benefits, categories, memberPageConfig }: CatalogPageContainerProps) => {
    const { t } = useTranslation('onboarding')
    const router = useRouter()
    const [config] = useState(memberPageConfig)
    const [selectedBenefits, setSelectedBenefits] = useState<SelectedMemberBenefit[]>(benefits)


    // const publishChanges = useCallback(async () => {

    //     if (config.imageURL && config.imageURL !== memberPageConfig.imageURL) {
    //         const blob = await fetch(config.imageURL).then(r => r.blob());

    //         const path = "memberbenefit_logo/" + config.id + "/" + "image.jpg"

    //         const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    //         const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, file, { cacheControl: '3600', upsert: true })
    //         if (!isUploaded) {
    //             throw new Error("Failed to upload image")
    //         }
    //         const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
    //         if (!downloadUrl) {
    //             throw new Error("Failed to get download url")
    //         }
    //         config.imageURL = downloadUrl.publicUrl
    //     }
    //     try {
    //         const updatedMemberPageConfig = await updateMemberPageConfig(config)

    //         if (!_.isEqual(selectedBenefits, benefits)) {
    //             // update selected benefits
    //             const toBeCreatedOtherMemberBenefits = selectedBenefits.filter(b => b.selected && benefits.some(benefit => benefit.id === b.id && !benefit.selected)).map(
    //                 b => b.id
    //             )
    //             const toBeDeletedOtherMemberBenefits = selectedBenefits.filter(b => !b.selected && benefits.some(benefit => benefit.id === b.id && benefit.selected)).map(b => b.id)
    //             await updateOtherMemberBenefits(toBeCreatedOtherMemberBenefits, toBeDeletedOtherMemberBenefits)
    //         } else {
    //             if (updatedMemberPageConfig) {
    //                 customToast.success("Changes Published Successfully")
    //             } else {
    //                 customToast.error("Something went wrong. Please try again")
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         customToast.error("Something went wrong. Please try again")
    //     } finally {
    //     }

    // }, [config, selectedBenefits]
    // )

    const handleBenefitClick = async (id: string, selected: boolean) => {

        try {
            const toBeCreatedOtherMemberBenefits = selected && !benefits.some(benefit => benefit.id === id && benefit.selected) ? [id] : []
            const toBeDeletedOtherMemberBenefits = !selected && benefits.some(benefit => benefit.id === id && benefit.selected) ? [id] : []
            await updateOtherMemberBenefits(toBeCreatedOtherMemberBenefits, toBeDeletedOtherMemberBenefits)
            setSelectedBenefits(selectedBenefits.map(benefit => {
                if (benefit.id === id) {
                    return { ...benefit, selected }
                }
                return benefit
            })
            )
            customToast.success(`Benefit ${selected ? "added" : "removed"} successfully`)
        } catch (error) {
            console.log(error)
            customToast.error("Something went wrong. Please try again")
        }

    }
    return (
        <div className=''>
            <div className='w-full bg-success  mb-8 p-3 rounded-xl'>
                <Typography type="p" className="text-white font-normal text-sm">You can customize the catalog here</Typography>
            </div>
            <ContentSection fullWidth additionalClassName={cn(' flex justify-end   w-fit   ')}>
                <div className='flex  w-full justify-end  right-36 gap-4 z-50 max-w-sm py-4 px-3'>
                    <Button variant="secondary" className='w-full' label="View Live Page" onClick={() => {
                        const url = `${platformConfig.variables.NEXT_PUBLIC_NEXT_URL}/${config.clientSlug}/memberbenefits`
                        window.open(url, '_blank')
                    }} />
                    <Button variant="primary" className='w-full' label="Add your own Benefits"
                        onClick={() => {
                            router.push("/memberbenefits?openModal=true")
                        }}
                    />
                </div>

            </ContentSection >
            <div className='max-w-[1440px] pb-20 lg:py-12 w-full mx-auto px-4 md:px-28'>
                <div className='px-4 md:px-0'>
                    <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5 text-center'>
                        <Typography type="h1" className="font-black text-[32px] leading-[45px] lg:text-5xl"

                        >{t("catalog.title")}</Typography>
                        <Typography type="p" className="text-base text-neutral-600 font-normal lg:text-xl"

                        >{t("catalog.description")}</Typography>
                    </div>
                </div>
                <div>
                    <div className='mb-40'>
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
                                                onClick={async () => {
                                                    await handleBenefitClick(benefit.id, !benefit.selected)
                                                }}
                                                key={index} benefit={benefit} />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div >
        </div >
    )
}

export default CatalogPageContainer