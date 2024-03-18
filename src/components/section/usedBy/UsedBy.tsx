import AnimatedSection from '@/components/animated/AnimatedSection'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import Typography from '@/components/atomic/typography/Typography'
import React from 'react'

const UsedBy = () => {
    return (
        <AnimatedSection>

            <div className='flex mt-10 mb-20  lg:my-20 justify-center flex-col items-center gap-8 lg:gap-12 w-full overflow-x-hidden'>

                <Typography type='h6' className=' text-[16px] font-normal leading-[30px] dark:text-white'>Used daily by more than 100+businesses</Typography>
                <InfiniteMovingCards />
            </div>
        </AnimatedSection>
    )
}

export default UsedBy