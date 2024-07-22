import { SelectedMemberBenefit } from '@/lib/types'
import { Category } from '@prisma/client'
import React, { useEffect } from 'react'
import SelectMemberBenefitCard from '../memberbenefit/SelectMemberBenefitCard'
import { cn } from '@/utils/cn'
import Button from '../atomic/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useMotionValueEvent, useScroll } from 'framer-motion'

interface SelectCategoryScrollerProps {
    category: Category
    selectedBenefits: SelectedMemberBenefit[]
    setSelectedBenefits: (selectedBenefits: SelectedMemberBenefit[]) => void
}

const SelectCategoryScroller = ({ category, selectedBenefits, setSelectedBenefits }: SelectCategoryScrollerProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const container = React.useRef<HTMLDivElement>(null)
    const absoluteContainer = React.useRef<HTMLDivElement>(null)
    const { scrollX } = useScroll({
        container: container
    })
    const [start, setStart] = React.useState(0)
    const [scrollStart, setScrollStart] = React.useState(0)




    useMotionValueEvent(scrollX, "change", () => {
        const value = scrollX.get();
        console.log(absoluteContainer.current?.clientWidth, value)
        setScrollStart(prevStart => {
            const jump = Math.floor(value / 350)
            return jump;
        })
    })
    useEffect(() => {
        console.log(scrollStart)
        console.log(start)
    }, [scrollStart, start])
    const onNext = () => {
        const jump = scrollStart;

        setScrollStart(0)
        const newStart = start + 1
        if (newStart >= selectedBenefits.length) {
            // setStart(0)
            return;
        }
        setStart(newStart)
    }
    const onPrev = () => {
        const jump = scrollStart;
        setScrollStart(0)

        const newStart = start - 1
        if (newStart < 0) {
            // setStart(selectedBenefits.length - 1)
            return;
        }
        setStart(newStart)
    }
    return (

        <div key={category.id} className='flex  flex-col gap-3 lg:gap-5 justify-start  mt-8 max-w-[100vw]   '>
            <div className='flex justify-between items-center w-full  max-w-[1440px] px-4 md:px-28  mx-auto'>
                <div className=" text-center text-black text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                <div className='justify-between hidden  md:flex w-fit gap-2'>
                    <Button disabled={start == 0} onClick={onPrev} variant='secondary' size='sm' icon={<ArrowLeftIcon />} className=' rounded-full bg-white  !w-fit  p-2 !min-w-fit  ' />
                    <Button disabled={start == selectedBenefits.length - 1} onClick={onNext} variant='secondary' size='sm' icon={<ArrowRightIcon />} className=' rounded-full bg-white !w-fit  p-2 !min-w-fit  ' />
                </div>
            </div>

            <div ref={container} className='relative w-full   h-[350px]  overflow-scroll no-scrollbar md:overflow-hidden'
            >
                <div ref={absoluteContainer}
                    style={{ width: `${Math.max(1, selectedBenefits.length) * 310 + 8 + 12 * selectedBenefits.length}px` }}
                    className={cn('  absolute   translate-x-4   md:translate-x-[110px] lg:translate-x-[calc((100vw-1440px+213px)/2)]  flex flex-row   gap-3  md:gap-5 justify-start flex-nowrap      ')}>
                    {selectedBenefits.map((benefit: SelectedMemberBenefit, index: any) => (
                        // <BlogCard loading={false} key={index} category={category} />
                        <div key={index} className={cn(' relative w-fit duration-300 ease-in-out')} style={{ transform: `translateX(calc(-${start * 100}% - ${start * (isDesktop ? 20 : 12)}px))` }}>

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

export default SelectCategoryScroller