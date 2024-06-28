'use client'
import Button from '@/components/atomic/button/Button'
import PageHeader from '@/components/memberbenefit/PageHeader'
import SelectMemberBenefitCard from '@/components/memberbenefit/SelectMemberBenefitCard'
import { MemberBenefit } from '@prisma/client'
import React, { useState } from 'react'
interface OnboardingContainerProps {
    benefits: MemberBenefit[]
    categories: Category[]
}

interface SelectedMemberBenefit extends MemberBenefit {
    selected: boolean
}


const OnboardingContainer = ({ benefits, categories }: OnboardingContainerProps) => {

    const [selectedBenefits, setSelectedBenefits] = useState<SelectedMemberBenefit[]>(
        benefits.map(benefit => {
            return {
                ...benefit,
                selected: false
            }
        })
    )
    console.log(selectedBenefits)

    return (
        <>

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

                <div className='fixed left-1/2 transform -translate-x-1/2 bottom-4 '>
                    <Button
                        onClick={() => {
                            console.log(selectedBenefits)
                        }}
                        label={"Click to Preview"}
                    />
                </div>

            </div>
        </>
    )
}

export default OnboardingContainer