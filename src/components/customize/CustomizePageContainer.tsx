'use client'
import { updateMemberBenefitOrder, updateMemberPageConfig, updateOtherMemberBenefits, updateSlug } from '@/app/actions'
import Button from '@/components/atomic/button/Button'
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import customToast from '@/components/atomic/toast/customToast'
import Typography from '@/components/atomic/typography/Typography'
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard'
import platformConfig from '@/config/app-config'
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { getDownloadUrl, uploadFile } from '@/lib/storage/storage'
import CustomizePageModal from '../molecules/customize-page-modal'
import EmbedModal from '../molecules/embed-modal/EmbedModal'
import CustomizePageActions from './CustomizePageActions'
import { MemberBenefitFilter, MemberBenefitWithImport, SelectedMemberBenefit, selectMemberBenefitFilter } from '@/lib/types'
import CategoryScroller from '../categoryscroller/CategoryScroller'
import Divider from '../atomic/divider/Divider'
import { PlusIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import siteUrls from '@/config/site-config'

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import './override.css'
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
interface CustomizePageContainerProps {
    benefits: MemberBenefitWithImport[]
    categories: Category[]
    memberPageConfig: MemberBenefitPageConfig
}




const CustomizePageContainer = ({ benefits, categories, memberPageConfig }: CustomizePageContainerProps) => {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false);
    const [defaultConfig, setDefaultConfig] = useState(memberPageConfig)
    const [config, setConfig] = useState(memberPageConfig)
    const [selectedBenefits, setSelectedBenefits] = useState<MemberBenefitWithImport[]>(benefits)
    const [embedModalOpen, setEmbedModalOpen] = useState(false)
    const [selectedDisplayType, setSelectedDisplayType] = useState<string>(selectMemberBenefitFilter.NEW)
    const [imageType, setImageType] = useState<string>("")
    const [orderChanged, setOrderChanged] = useState(false)
    useEffect(() => {
        if (_.isEqual(config, defaultConfig)) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }, [config])

    useEffect(() => {
        if (_.isEqual(benefits, selectedBenefits)) {
            setOrderChanged(false)
        } else {
            setOrderChanged(true)
        }
    }, [selectedBenefits])

    useEffect(() => {

        // order items
        const sortedBenefits = selectedBenefits.sort((a, b) => a.order - b.order)
        setSelectedBenefits(sortedBenefits)
    }, [])

    console.log(selectedBenefits)

    const publishChanges = useCallback(async () => {
        if (!isEditing && !orderChanged) {
            window.open(`/${config.clientSlug}/memberbenefits`, "_blank")
            return
        }

        if (orderChanged) {
            try {
                setLoading(true)
                await updateMemberBenefitOrder(selectedBenefits)
                setOrderChanged(false)
            } catch (error) {
                customToast.error("Could not update orders")
            } finally {
                setOrderChanged(false)
                setLoading(false)
            }

        }
        if (isEditing) {
            if (config.imageURL && config.imageURL !== memberPageConfig.imageURL) {
                const blob = await fetch(config.imageURL).then(r => r.blob());
                const randomNumber = Math.floor(Math.random() * 10)
                const path = "memberbenefit_logo/" + config.id + "/" + `image-${randomNumber}.${imageType ?? 'jpg'}`

                const file = new File([blob], `image.${imageType ?? 'jpg'}`, { type: imageType.includes('svg') ? "image/svg+xml" : "image/jpeg" });
                const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, file, { cacheControl: '3600', upsert: true })
                if (!isUploaded) {
                    throw new Error("Failed to upload image")
                }
                const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
                if (!downloadUrl) {
                    throw new Error("Failed to get download url")
                }
                config.imageURL = downloadUrl.publicUrl
            }
            setLoading(true)
            try {
                const updatedMemberPageConfig = await updateMemberPageConfig(config)

                if (updatedMemberPageConfig) {
                    customToast.success("Changes Published Successfully")
                    setConfig(updatedMemberPageConfig)
                    setDefaultConfig(updatedMemberPageConfig)
                } else {
                    customToast.error("Something went wrong. Please try again")
                }
                // setLoading(false)
                // if (!_.isEqual(selectedBenefits, benefits)) {
                //     // update selected benefits
                //     const toBeCreatedOtherMemberBenefits = selectedBenefits.filter(b => b.selected && benefits.some(benefit => benefit.id === b.id && !benefit.selected)).map(
                //         b => b.id
                //     )
                //     const toBeDeletedOtherMemberBenefits = selectedBenefits.filter(b => !b.selected && benefits.some(benefit => benefit.id === b.id && benefit.selected)).map(b => b.id)
                //     await updateOtherMemberBenefits(toBeCreatedOtherMemberBenefits, toBeDeletedOtherMemberBenefits)
                // } else {
                //     if (updatedMemberPageConfig) {
                //         customToast.success("Changes Published Successfully")
                //         setConfig(updatedMemberPageConfig)
                //         setDefaultConfig(updatedMemberPageConfig)
                //     } else {
                //         customToast.error("Something went wrong. Please try again")
                //     }
                // }
            } catch (error) {
                console.log(error)
                customToast.error("Something went wrong. Please try again")
            } finally {
                setLoading(false)
            }
        }


    }, [config, selectedBenefits, isEditing, orderChanged]
    )
    const updateSlugMutation = useMutation({
        mutationFn: async (slug: string) => {
            return await updateSlug(config.id, slug)
        },
        onSettled: (data) => {
            if (data) {
                setConfig(data)
                setDefaultConfig(data)
                customToast.success("URL Updated Successfully")
            } else {
                customToast.error("This URL is already taken. Please try another one")
            }
        }
    })
    return (
        <div className='bg-landing-background '>
            <div className=' px-5 py-4   lg:px-12'>

                <CustomizePageActions

                    disabled={!isEditing && !orderChanged}
                    loading={loading}
                    config={config}
                    publishChanges={publishChanges}
                    onUpdate={(property, value) => {
                        setConfig({ ...config, [property]: value })
                    }}
                    openShareModal={() => {
                        setEmbedModalOpen(true)
                    }}

                />
            </div>
            <Divider className='bg-[#DDDDDD]' dividerStyle="heavy" dividerType={"horizontal"} />
            <div style={{
                backgroundColor: config.backgroundColor as string,
            }} className='pb-40'>

                <div className=''>
                    <div className='max-w-[1440px] py-8 lg:pt-20 w-full px-4 md:px-12'>
                        <ImageUploader onImageUpload={(image, type) => {
                            setConfig({ ...config, imageURL: image, })
                            setImageType(type)
                        }}
                            image={config.imageURL}
                        />
                    </div>

                    <div className='max-w-[1440px] w-full mx-auto px-4 md:px-12'>
                        <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5 text-center'>
                            <Typography type="h1" contentEditable className={`font-black text-[32px] leading-[45px] lg:text-5xl font-${config.primaryFont}
                                hover:border-[#CECECE] border-[1px] border-transparent   p-3
                             focus:border-[#CECECE]
                               focus:outline-none 
                               min-w-[100px]
                            `}
                                onInput={(e: any) => {
                                    setConfig({ ...config, title: e.target.textContent })
                                }}
                                style={{
                                    color: config.textColor as string
                                }}
                            >{memberPageConfig.title}</Typography>
                            <Typography type="p" contentEditable className={`text-base text-neutral-600 font-normal lg:text-xl font-${config.secondaryFont}
                             hover:border-[#CECECE] border-[1px] border-transparent   p-1
                             focus:border-[#CECECE]
                               focus:outline-none 
                               min-w-[100px]
                               `}
                                onInput={(e: any) => {
                                    setConfig({ ...config, description: e.target.textContent })
                                }}
                                style={{
                                    color: config.textColor as string
                                }}
                            >{memberPageConfig.description} </Typography>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="flex flex-col md:flex-row gap-4  items-start justify-between w-full  text-black md:items-center max-w-[1440px]  mx-auto px-4 md:px-12">
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
                                                window.open(siteUrls.general.onboarding, "_blank")
                                            }}
                                            icon={<PlusIcon />}
                                            className='text-[#7A7A7A] bg-[#EDEDED] rounded-[38px]'

                                            label="Suggest a Deal" variant="tertiary" />
                                    )}
                                </div>

                                {/* <div className='tabs bg-[#F0F0F0]  p-1  w-full lg:w-fit flex flex-shrink-0 justify-between lg:justify-center  gap-2 rounded-[10px]'
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
                                </div> */}
                            </div>
                            <div>
                                {selectedDisplayType == selectMemberBenefitFilter.CATEGORY && categories.filter(category => selectedBenefits.filter(benefit => category.id == benefit.categoryId).length > 0).map((category) => {
                                    return (
                                        <CategoryScroller
                                            key={category.id}
                                            category={category}
                                            memberBenefits={selectedBenefits.filter(benefit => category.id == benefit.categoryId)}
                                            config={config}

                                        />
                                    )
                                })}

                                {[selectMemberBenefitFilter.NEW].includes(selectedDisplayType) && (
                                    <ResponsiveGridLayout
                                        className=" mt-8  max-w-[1440px]  mx-auto ga[=] lg:px-8"
                                        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 480, xxs: 0 }}
                                        cols={{ lg: 3, md: 1, sm: 1, xs: 1, xxs: 1 }}
                                        rowHeight={380}
                                        width={1440}
                                        isDroppable={true}
                                        isResizable={false}
                                        onDragStop={async (layout: any) => {
                                            const sortedArray = layout.sort((a: any, b: any) => a.y - b.y || a.x - b.x);
                                            const newSelectedBenefits = sortedArray.map((item: any) => selectedBenefits.find(f => f.id == item.i))
                                                .map((benefit: any, index: any) => {
                                                    return {
                                                        ...benefit,
                                                        order: index
                                                    }
                                                })
                                            // console.log(newSelectedBenefits)
                                            // await updateMemberBenefitOrder(newSelectedBenefits)
                                            setSelectedBenefits(newSelectedBenefits)
                                        }}
                                        compactType="horizontal"
                                        isBounded={true}

                                    >
                                        {selectedBenefits && selectedBenefits
                                            .map((benefit: MemberBenefit, index: any) => (
                                                <div key={benefit.id} className='cursor-grab' data-grid={{ x: index % 3, y: Math.floor(index / 3), w: 1, h: 1, }}>
                                                    <MemberBenefitCard
                                                        isEditing={true}
                                                        config={config}
                                                        className='w-[340px]   lg:min-w-32 md:max-w-full max-w-full md:min-w-32 md:!w-full'

                                                        key={index} benefit={benefit} />
                                                </div>
                                            ))}
                                    </ResponsiveGridLayout>
                                )}

                            </div>
                        </div>
                    </div>
                </div >
                {/** Modals */}

                {settingsModalOpen && <CustomizePageModal
                    loading={loading}
                    config={config}
                    onClose={() => {
                        setSettingsModalOpen(false)
                    }}
                    onUpdate={async (newConfig: any) => {
                        try {
                            const mergedConfig = {
                                ...config,
                                ...newConfig,
                                clientSlug: newConfig.slug
                            }
                            setConfig(mergedConfig)
                            setSettingsModalOpen(false)
                            customToast.success("Settings Updated Successfully")
                        } catch (error) {
                            customToast.error("Something went wrong. Please try again")
                        }

                    }}
                />
                }
                {embedModalOpen && <EmbedModal
                    isOpen={embedModalOpen}
                    clientSlug={config.clientSlug}
                    onClose={() => {
                        setEmbedModalOpen(false)
                    }}
                    loading={updateSlugMutation.isPending}
                    onUpdate={async (property: keyof MemberBenefitPageConfig, value: string | boolean) => {
                        if (property === "clientSlug") {
                            await updateSlugMutation.mutateAsync(value as string)
                        }
                    }}
                />
                }
            </div >
        </div>

    )
}

export default CustomizePageContainer