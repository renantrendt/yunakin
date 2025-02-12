import React from 'react'
import FeatureItem from './feature-item'
import { useTranslation } from '@/lib/i18n/client'
import ContentSection from '@/containers/layout/ContentSection'
import AnimatedSection from '../animated/AnimatedSection'
import Typography from '../atomic/typography/Typography'

const Features = () => {
    const { t } = useTranslation('landing')
    const features = (t("features.features", { returnObjects: true }) as { title: string, description: string, image: string, direction?: "ltr" | "rtl" }[])
        .map((feature, index) => ({ ...feature, image: `/images/landing/features/feature-${index + 1}.svg`, direction: index % 2 === 0 ? "rtl" : "ltr" }))
    return (
        <ContentSection>

            <section id='features' className='pb-32 mt-10 lg:mt-24  flex flex-col gap-24 lg:gap-64 w-full h-full md:px-0 text-black dark:text-white'>
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
        </ContentSection>
    )
}

export default Features