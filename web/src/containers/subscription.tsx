import { Plans } from '@/components/pricing/pricing'
import PricingProduct from '@/components/pricing/pricing-product'
import React from 'react'

const subscription = () => {
    const features = [
        {
            name: "Feature 1",
            plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 2",
            plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 3",
            plans: [Plans.PRO, Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 4",
            plans: [Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 5",
            plans: [Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 6",
            plans: [Plans.BUSINESS, Plans.ADVANCED],
        },
        {
            name: "Feature 7",
            plans: [Plans.ADVANCED],
        },
        {
            name: "Feature 8",
            plans: [Plans.ADVANCED],
        },
        {
            name: "Feature 9",
            plans: [Plans.ADVANCED],
        }
    ]
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full'>
            <PricingProduct
                name={'Pro'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={29.99}
                plan={Plans.PRO}
                features={features}
            />
            <PricingProduct
                name={'Personal'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={59.99}
                plan={Plans.BUSINESS}

                features={features}
                recommended={true}
            />
            <PricingProduct
                name={'Startup'}
                description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                price={79.99}
                plan={Plans.ADVANCED}
                features={features}
            />
        </section>
    )
}

export default subscription