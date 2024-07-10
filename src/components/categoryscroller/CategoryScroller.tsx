import { SelectedMemberBenefit } from '@/lib/types'
import { Category } from '@prisma/client'
import React from 'react'
import SelectMemberBenefitCard from '../memberbenefit/SelectMemberBenefitCard'
import { cn } from '@/utils/cn'
import Button from '../atomic/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

interface CategoryScrollerProps {
    category: Category
    selectedBenefits: SelectedMemberBenefit[]
    setSelectedBenefits: (selectedBenefits: SelectedMemberBenefit[]) => void
}

const CategoryScroller = ({ category, selectedBenefits, setSelectedBenefits }: CategoryScrollerProps) => {
    const [start, setStart] = React.useState(0)
    const onNext = () => {
        setStart(start + 1)
        if (start === selectedBenefits.length - 1) {
            setStart(0)
        }
    }
    const onPrev = () => {
        setStart(start - 1)
        if (start === 0) {
            setStart(selectedBenefits.length - 1)
        }
    }
    return (

        <div key={category.id} className='flex  flex-col gap-3 lg:gap-5 justify-start  mt-8 max-w-[100vw]   '>
            <div className='flex justify-between items-center'>

                <div className=" w-fit	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                    <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                </div>
                <div className='justify-between flex w-fit gap-2'>
                    <Button onClick={onPrev} variant='secondary' size='sm' icon={<ArrowLeftIcon />} className=' rounded-full bg-white  !w-fit  p-2 !min-w-fit  ' />
                    <Button onClick={onNext} variant='secondary' size='sm' icon={<ArrowRightIcon />} className=' rounded-full bg-white !w-fit  p-2 !min-w-fit  ' />
                </div>
            </div>

            <div className='relative w-full  h-[400px]'>

                <div className='  absolute   flex flex-row    gap-3  lg:gap-5 justify-between flex-nowrap      '>
                    {selectedBenefits.map((benefit: SelectedMemberBenefit, index: any) => (
                        // <BlogCard loading={false} key={index} category={category} />
                        <div key={index} className={cn(' relative  w-[calc(100vw-48px)]  duration-300 ease-in-out')} style={{ transform: `translateX(calc(-${start * 100}% - ${start * 12}px))` }}>

                            <SelectMemberBenefitCard
                                selected={benefit.selected}
                                onClick={() => {
                                    const newSelectedBenefits = selectedBenefits.map(b => b.id === benefit.id ? { ...b, selected: !b.selected } : b)
                                    setSelectedBenefits(newSelectedBenefits)
                                }}
                                className='w-full'
                                key={index} benefit={benefit} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CategoryScroller