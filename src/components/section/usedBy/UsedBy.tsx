import AnimatedSection from '@/components/animated/AnimatedSection'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import Typography from '@/components/atomic/typography/Typography'
import ContentSection from '@/containers/layout/ContentSection'
import React from 'react'
import { useTranslation } from 'react-i18next'

const UsedBy = () => {
    const { t } = useTranslation('landing');
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