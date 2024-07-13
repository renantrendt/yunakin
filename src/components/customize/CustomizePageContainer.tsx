'use client'
import { createMemberPageConfigWithoutUser, getMemberPageConfigByClientSlug, updateMemberPageConfig, updateOtherMemberBenefits } from '@/app/actions'
import Badge from '@/components/atomic/badge/Badge'
import Button from '@/components/atomic/button/Button'
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import InputField from '@/components/atomic/input/InputField'
import customToast from '@/components/atomic/toast/customToast'
import Typography from '@/components/atomic/typography/Typography'
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard'
import PageHeader from '@/components/memberbenefit/PageHeader'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import platformConfig from '@/config/app-config'
import siteUrls from '@/config/site-config'
import ContentSection from '@/containers/layout/ContentSection'
import { cn } from '@/utils/cn'
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from 'postcss'
import React, { use, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { set } from 'react-ga'
import { getDownloadUrl, uploadFile } from '@/lib/storage/storage'
import CustomizePageModal from '../molecules/customize-page-modal'
import EmbedModal from '../molecules/embed-modal/EmbedModal'
import EditFontModal from '../molecules/modals/edit-font-modal'
interface CustomizePageContainerProps {
    benefits: SelectedMemberBenefit[]
    categories: Category[]
    memberPageConfig: MemberBenefitPageConfig
}

interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


const CustomizePageContainer = ({ benefits, categories, memberPageConfig }: CustomizePageContainerProps) => {
    const router = useRouter()
    const [settingsModalOpen, setSettingsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState(memberPageConfig)
    const [selectedBenefits, setSelectedBenefits] = useState<SelectedMemberBenefit[]>(benefits)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [embedModalOpen, setEmbedModalOpen] = useState(false)

    const [editFontModal, setEditFontModal] = useState(false)
    const [editColorModal, setEditColorModal] = useState(false)
    useEffect(() => {
        if (isEditing) {

        }
    }, [pathname, searchParams])


    useEffect(() => {
        if (_.isEqual(config, memberPageConfig)) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }, [config])

    const publishChanges = useCallback(async () => {

        if (config.imageURL && config.imageURL !== memberPageConfig.imageURL) {
            const blob = await fetch(config.imageURL).then(r => r.blob());

            const path = "memberbenefit_logo/" + config.id + "/" + "image.jpg"

            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
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

            setLoading(false)
            if (!_.isEqual(selectedBenefits, benefits)) {
                // update selected benefits
                const toBeCreatedOtherMemberBenefits = selectedBenefits.filter(b => b.selected && benefits.some(benefit => benefit.id === b.id && !benefit.selected)).map(
                    b => b.id
                )
                const toBeDeletedOtherMemberBenefits = selectedBenefits.filter(b => !b.selected && benefits.some(benefit => benefit.id === b.id && benefit.selected)).map(b => b.id)
                await updateOtherMemberBenefits(toBeCreatedOtherMemberBenefits, toBeDeletedOtherMemberBenefits)
            } else {
                if (updatedMemberPageConfig) {
                    customToast.success("Changes Published Successfully")
                } else {
                    customToast.error("Something went wrong. Please try again")
                }
            }
        } catch (error) {
            console.log(error)
            customToast.error("Something went wrong. Please try again")
        } finally {
            setLoading(false)
        }

    }, [config, selectedBenefits]
    )

    return (
        <div className='bg-landing-background '>
            <div className='   mb-8 p-3 rounded-xl z-30 flex flex-col gap-6 justify-start'>
                <Typography type="p" className="text-[#858585] font-normal text-sm w-full text-left">Customization Tools</Typography>
                <div className='flex  w-full justify-between items-center' >
                    <div className='edit flex gap-2'>
                        <Button variant="secondary" className='w-full' label="Edit Font"
                            onClick={() => {
                                setEditFontModal(true)
                            }}
                        />
                        <Button variant="secondary" className='w-full' label="Edit  Color"
                            onClick={() => {
                                setEditColorModal(true)
                            }}
                        />
                    </div>
                    <div className='preview flex gap-2'>
                        <Button variant="primary" className='w-full' label="Publish Changes" loading={loading}
                            onClick={publishChanges}
                        />

                        <Button variant="primary" className='w-full' label="Publish Changes" loading={loading}
                            onClick={publishChanges}
                        />
                    </div>
                </div >
            </div>
            <div style={{
                backgroundColor: config.backgroundColor as string,
            }}>

                <div className='max-w-[1440px] pb-20 lg:py-20 w-full mx-auto px-4 md:px-28'>
                    <ImageUploader onImageUpload={image => {
                        setConfig({ ...config, imageURL: image })
                    }}
                        image={config.imageURL}
                    />
                    <div className='px-4 md:px-0'>
                        <div className=' my-10 lg:my-20 flex flex-col justify-center items-center gap-3 lg:gap-5 text-center'>
                            <Typography type="h1" contentEditable className={`font-black text-[32px] leading-[45px] lg:text-5xl font-${config.primaryFont}`}
                                onInput={(e: any) => {
                                    setConfig({ ...config, title: e.target.textContent })
                                }}
                                style={{
                                    color: config.textColor as string
                                }}
                            >{memberPageConfig.title}</Typography>
                            <Typography type="p" contentEditable className={`text-base text-neutral-600 font-normal lg:text-xl font-${config.secondaryFont}`}
                                onInput={(e: any) => {
                                    console.log(e)
                                    console.log(e.target.innerText)
                                    setConfig({ ...config, description: e.target.textContent })
                                }}
                                style={{
                                    color: config.textColor as string
                                }}
                            >{memberPageConfig.description} </Typography>
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
                                                <MemberBenefitCard
                                                    config={config}
                                                    trackAnalytics={false}
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
                </div >
                {/** Modals */}

                {editFontModal && <EditFontModal
                    config={config}
                    onClose={() => {
                        setEditFontModal(false)
                    }
                    }
                    onUpdate={async (data: any) => {
                        const oldConfgi = {
                            ...config
                        }
                        try {
                            const newConfig = {
                                ...config,
                                primaryFont: data.primaryFont,
                                secondaryFont: data.secondaryFont,
                            }

                            setConfig(newConfig)
                            await updateMemberPageConfig(newConfig)
                            setEditFontModal(false)
                            customToast.success("Font Updated Successfully")
                        } catch (error) {
                            setConfig(oldConfgi)
                            customToast.error("Something went wrong. Please try again")
                        }
                    }}
                />
                }
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
                        } finally {
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
                />
                }
            </div >
        </div>

    )
}

export default CustomizePageContainer