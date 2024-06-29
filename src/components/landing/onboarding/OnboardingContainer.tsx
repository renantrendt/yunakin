'use client'
import { createMemberPageConfigWithoutUser, getMemberPageConfigByClientSlug } from '@/app/actions'
import Badge from '@/components/atomic/badge/Badge'
import Button from '@/components/atomic/button/Button'
import InputField from '@/components/atomic/input/InputField'
import customToast from '@/components/atomic/toast/customToast'
import PageHeader from '@/components/memberbenefit/PageHeader'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import { Category, MemberBenefit } from '@prisma/client'
import React, { useState } from 'react'
interface OnboardingContainerProps {
    benefits: MemberBenefit[]
    categories: Category[]
}

interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


const OnboardingContainer = ({ benefits, categories }: OnboardingContainerProps) => {
    const [step, setStep] = useState<number>(1)
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
        <div>
            {step == 1 && (
                <div>
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
                        {/* <div key={"null"} className='flex flex-col'>
                <div className=" 	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                    <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{"Uncategorized"}</div>
                </div>
                {benefits && benefits.filter((benefit: MemberBenefit) => !benefit.categoryId).map((benefit: MemberBenefit, index: any) => (
                    // <BlogCard loading={false} key={index} category={category} />
                    <MemberBenefitCard key={index} benefit={benefit} />

                ))}
            </div> */}
                    </div>
                </div>
            )}
            {step == 2 && (
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <div className='flex flex-col gap-4 justify-center items-center'>
                        <div className='text-xl text-center font-bold'>{"You selected " + selectedBenefits.filter(s => s.selected).length + " benefits"}</div>
                        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
                            {selectedBenefits.filter(s => s.selected).map(d => {
                                return (
                                    <Badge color={'orange'} type='outline' key={d.id}>{d.title}</Badge>
                                )
                            })}
                        </div>
                        <InputField
                            name="clientSlug"
                            id="clientSlug"
                            value={clientSlug}
                            onChange={(e) => {
                                setClientSlug(e.target.value)
                            }}
                            label="Your member page slug"
                            placeholder="yunakin.com/{your_slug}/memberbenefits"
                        />
                    </div>
                </div>
            )}
            {step == 3 && (
                <div>
                    <div>
                        <div>{"Your member page is created. Yohoo"}</div>
                        <a href={`http://localhost:3000/${clientSlug}/memberbenefits`}>{"https://yunakin.com/" + clientSlug + "/memberbenefits"}</a>
                    </div>
                </div>
            )}
            <div className='fixed transform gap-2  w-full max-w-sm px-4 left-1/2 -translate-x-1/2 bottom-4'>
                {step != 3 && (<Button
                    onClick={async () => {
                        if (step == 1 && selectedBenefits.filter(s => s.selected).length == 0) {
                            customToast.warn("Please select at least one benefit")
                            return
                        }
                        if (step == 2) {
                            const memberPageConfig = await getMemberPageConfigByClientSlug(clientSlug)
                            if (memberPageConfig) {
                                customToast.warn("This slug is already taken. Please choose another one")
                                return
                            }
                            else {
                                const newMemberPageConfig = await createMemberPageConfigWithoutUser({
                                    clientSlug: clientSlug,
                                    title: "My Member Page",
                                    description: "My Member Page",
                                    imageURL: "https://yunakin.com/images/logo.svg",
                                }, selectedBenefits.filter(s => s.selected).map(s => s.id))
                                if (newMemberPageConfig) {
                                    setStep(3)
                                } else {
                                    customToast.error("Something went wrong. Please try again")
                                }
                                return;
                            }
                        }
                        setStep(step + 1)
                    }}
                    className='w-full'
                    label={"Next"}
                />)}
                {step > 1 && (
                    <Button
                        onClick={() => {
                            setStep(step - 1)
                        }}
                        className='w-full'
                        variant='secondary'
                        label={"Back"}
                    />
                )}
            </div>

        </div>

    )
}

export default OnboardingContainer