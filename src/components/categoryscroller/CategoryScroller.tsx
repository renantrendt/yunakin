import { SelectedMemberBenefit } from '@/lib/types'
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import React from 'react'
import SelectMemberBenefitCard from '../memberbenefit/SelectMemberBenefitCard'
import { cn } from '@/utils/cn'
import Button from '../atomic/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import useMediaQuery from '@/hooks/useMediaQuery'
import MemberBenefitCard from '../memberbenefit/MemberBenefitCard'
import { usePathname } from 'next/navigation'

interface CategoryScrollerProps {
    category: Category
    config: MemberBenefitPageConfig
    memberBenefits: MemberBenefit[]

}

const CategoryScroller = ({ category, memberBenefits, config }: CategoryScrollerProps) => {

    const isDesktop = useMediaQuery('(min-width: 960px)');

    const pathname = usePathname()

    const [start, setStart] = React.useState(0)
    const onNext = () => {
        if (start >= memberBenefits.length) {
            // setStart(0)
            return;
        }
        setStart(start + 1)

    }
    const onPrev = () => {
        if (start < 0) {
            // setStart(selectedBenefits.length - 1)
            return;
        }
        setStart(start - 1)


    }
    return (

        <div key={category.id} className='flex  flex-col gap-3 lg:gap-5 justify-start  mt-8 max-w-[100vw]   '>
            <div className={cn('flex justify-between items-center w-full  max-w-[1440px] px-4 md:px-28  mx-auto',
                { "md:px-12": pathname.includes("customize") }
            )}>

                <div className=" text-center text-black text-sm font-semibold  uppercase tracking-[0.5px]  "
                    style={{
                        color: config.textColor as string
                    }}>{category.name}</div>
                <div className='justify-between flex w-fit gap-2'>
                    <Button onClick={onPrev} variant='secondary' size='sm' icon={<ArrowLeftIcon />} className=' rounded-full bg-white  !w-fit  p-2 !min-w-fit  '
                        style={{
                            backgroundColor: config.buttonColor as string,
                            color: config.textColor as string
                        }}
                        disabled={start == 0}

                    />
                    <Button onClick={onNext} variant='secondary' size='sm' icon={<ArrowRightIcon />} className=' rounded-full bg-white !w-fit  p-2 !min-w-fit  '
                        style={{
                            backgroundColor: config.buttonColor as string,
                            color: config.textColor as string
                        }}
                        disabled={start == memberBenefits.length - 1}

                    />
                </div>
            </div>

            <div className='relative w-full  h-[350px] lg:h-[400px] overflow-scroll no-scrollbar'>

                <div
                    style={{ width: `${Math.max(1, memberBenefits.length) * 310 + 8 + 12 * memberBenefits.length}px` }}
                    className={cn('  absolute   translate-x-4   md:translate-x-[110px] lg:translate-x-[calc((100vw-1440px+213px)/2)]  flex flex-row   gap-3  md:gap-5 justify-start flex-nowrap')}>                    {memberBenefits.map((benefit: MemberBenefit, index: any) => (
                        // <BlogCard loading={false} key={index} category={category} />
                        <div key={index} className={cn(' relative w-fit duration-300 ease-in-out')} style={{ transform: `translateX(calc(-${start * 100}% - ${start * (isDesktop ? 20 : 12)}px))` }}>

                            <MemberBenefitCard
                                config={config}
                                className='w-full'
                                key={index}
                                benefit={benefit}
                                isEditing={pathname.includes("customize")}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CategoryScroller