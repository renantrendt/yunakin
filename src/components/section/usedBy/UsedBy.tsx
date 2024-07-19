import AnimatedSection from '@/components/animated/AnimatedSection'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import ContentSection from '@/containers/layout/ContentSection'
import React from 'react'

const UsedBy = () => {
    return (
        <ContentSection
            fullWidth
            additionalClassName='bg-white z-20'

        >
            <AnimatedSection>

                <div className='flex my-10 justify-center flex-col items-center gap-8 lg:gap-12 w-full overflow-x-hidden'>

                    <InfiniteMovingCards />
                </div>
            </AnimatedSection>
        </ContentSection>

    )
}

export default UsedBy