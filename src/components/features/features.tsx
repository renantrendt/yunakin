import React from 'react'
import FeatureItem from './feature-item'
import { siteCopy } from '@/config/site-config'
import { useTranslation } from '@/lib/i18n/client'

const Features = () => {
    const features = siteCopy.featuresSection.features
    const { t } = useTranslation('landing')
    return (

        <section id='features' className='py-32  flex flex-col gap-32 lg:gap-64 w-full h-full md:px-0 text-black dark:text-white'>
            {features.map((feature, index) => (
                <FeatureItem
                    key={index}
                    title={t(feature.title)}
                    description={t(feature.description)}
                    image={feature.image}
                    direction={feature.direction ?? "ltr"}
                />
            ))}
        </section>
    )
}

export default Features