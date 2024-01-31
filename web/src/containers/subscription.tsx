import PricingProduct from '@/components/section/pricing/pricing-product'
import platformConfig, { Plans } from '@/config/app-config'
import React from 'react'

const subscription = () => {

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full'>
            <PricingProduct
                name={'Pro'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={29.99}
                plan={Plans.PRO}
                features={platformConfig.pricing.features}
            />
            <PricingProduct
                name={'Personal'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={59.99}
                plan={Plans.BUSINESS}

                features={platformConfig.pricing.features}
                recommended={true}
            />
            <PricingProduct
                name={'Startup'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={79.99}
                plan={Plans.ADVANCED}
                features={platformConfig.pricing.features}
            />
        </section>
    )
}

export default subscription