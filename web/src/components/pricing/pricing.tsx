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
        <div className='my-20 w-full '>
            <div className=' flex flex-col justify-center items-center gap-5 mb-8 dark:text-white'>
                <h1 className='text-5xl font-bold text-center mb-2'>Enable the best experience</h1>
                <h3 className='text-xl  mb-20 max-w-xl text-center'>Choose a plan and start your 14-day free trial. Generate appointments and leads or source talent online, risk-free.</h3>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 px-4 md:px-0 '>
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
        </div>
    )
}
