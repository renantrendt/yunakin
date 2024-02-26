import AnimatedSection from '@/components/animated/AnimatedSection'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import Typography from '@/components/atomic/typography/Typography'
import React from 'react'

const UsedBy = () => {
    return (
        <AnimatedSection>

            <div className='flex justify-center flex-col items-center mt-20 gap-8 lg:gap-12 w-full overflow-x-hidden'>

                <Typography type='h6' className=' text-[20px] font-normal leading-[30px]'>Used daily by more than 100+businesses</Typography>
                <InfiniteMovingCards />
            </div>
        </AnimatedSection>
    )
}

export default UsedBy