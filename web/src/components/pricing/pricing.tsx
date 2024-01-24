import PricingProduct from './pricing-product'
import React from 'react'

export enum Plans {
    PRO,
    BUSINESS,
    ADVANCED
}

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
export default function Pricing() {
    return (
        <div className='my-20 w-full'>
            <h1 className='text-4xl font-bold text-center mb-5'>Pricing</h1>
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 flex justify-center'>
                <PricingProduct
                    name={'Pro'}
                    description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                    price={50}
                    plan={Plans.PRO}
                    features={features}
                />
                <PricingProduct
                    name={'Personal'}
                    description={'Description'}
                    price={119}
                    plan={Plans.BUSINESS}

                    features={features}
                />
                <PricingProduct
                    name={'Startup'}
                    description={'Description'}
                    price={200}
                    plan={Plans.ADVANCED}
                    features={features}
                />
            </section>
        </div>
    )
}
