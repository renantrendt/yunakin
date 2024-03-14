import React from 'react'
import FeatureItem from './feature-item'
import { siteCopy } from '@/config/site-config'

const Features = () => {
    const features = siteCopy.featuresSection.features
    return (

        <section id='features' className='py-32  flex flex-col gap-32 lg:gap-64 w-full h-full md:px-0 text-black dark:text-white'>
            {features.map((feature, index) => (
                <FeatureItem
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    image={feature.image}
                    direction={feature.direction ?? "ltr"}
                />
            ))}
        </section>
    )
}

export default Features