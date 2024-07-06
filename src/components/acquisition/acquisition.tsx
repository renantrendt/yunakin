import React from 'react'
import AnimatedSection from '../animated/AnimatedSection'
import ContentSection from '@/containers/layout/ContentSection'
import Typography from '../atomic/typography/Typography'
import { useTranslation } from 'react-i18next'

const Acquisition = () => {
    const { t } = useTranslation('landing')
    return (
        <ContentSection>
            <AnimatedSection className=' flex flex-col max-w-xl mx-auto justify-center items-center gap-5 my-24 lg:my-48'>
                <Typography type='h1' className='text-center max-w-lg lg:!text-5xl !leading-[133%]' >{t("acquisitionSection.title")}</Typography>
                <Typography type='h6' className='text-center  !text-[18px] !leading-[150%]' >{t("acquisitionSection.description")}</Typography>
            </AnimatedSection>
        </ContentSection>

    )
}

export default Acquisition