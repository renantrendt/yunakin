import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import Typography from '@/components/atomic/typography/Typography'
import React from 'react'

const UsedBy = () => {
    return (
        <div className='flex justify-center flex-col items-center mt-20 gap-8 lg:gap-12 w-full overflow-x-hidden'>
            <Typography type='h6' className='lg:text-xl text-xl font-normal'>Used daily by more than 100+businesses</Typography>
            <InfiniteMovingCards />
        </div>
    )
}

export default UsedBy