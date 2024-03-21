import AnimatedSection from '@/components/animated/AnimatedSection'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'
import Typography from '@/components/atomic/typography/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

const UsedBy = () => {
    const { t } = useTranslation('landing');
    return (
        <AnimatedSection>

            <div className='flex mt-10 mb-20  lg:my-20 justify-center flex-col items-center gap-8 lg:gap-12 w-full overflow-x-hidden'>

                <Typography type='h6' className=' text-[16px] font-normal leading-[30px] dark:text-white'>{t('usedBy.title')}</Typography>
                <InfiniteMovingCards />
            </div>
        </AnimatedSection>
    )
}

export default UsedBy