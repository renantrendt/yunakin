import platformConfig, { Plans } from '@/config/app-config'
import PricingProduct from './pricing-product'
import React from 'react'



const features = platformConfig.pricing.features;
export default function Pricing({ showDescription = false }: { showDescription?: boolean }) {
    const [isMonthly, setIsMonthly] = React.useState(false)
    return (
        <div className='my-20 w-full  ' id='pricing'>
            {showDescription && (
                <div className=' flex flex-col justify-center items-center gap-5 mb-8 text-black dark:text-white'>
                    <h1 className='text-5xl font-bold text-center mb-2'>Enable the best experience</h1>
                    <h3 className='text-xl  mb-20 max-w-xl text-center'>Choose a plan and start your 14-day free trial. Generate appointments and leads or source talent online, risk-free.</h3>
                </div>
            )}

            <div className='flex justify-center mb-12 items-center mx-auto  hover:cursor-pointer  text-md w-fit gap-0 bg-white shadow-md rounded-3xl p-1'>
                <div className={`${isMonthly ? "bg-primary text-white" : ""} rounded-3xl px-3 py-2  transition duration-300 `} onClick={() => setIsMonthly(true)}>
                    <span className=''>Monthly</span>
                </div>
                <div className={`${!isMonthly ? "bg-primary text-white" : ""} rounded-3xl px-3 py-2 transition duration-300 `} onClick={() => setIsMonthly(false)}>
                    <span >Yearly</span>
                </div>
            </div>
            <section className='grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full'>
                <PricingProduct
                    name={'Pro'}
                    description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                    price={isMonthly ? platformConfig.pricing.plans.pro.price : platformConfig.pricing.plans.pro_yearly.price}
                    plan={Plans.PRO}
                    features={features}
                    planId={isMonthly ? platformConfig.pricing.plans.pro.planId : platformConfig.pricing.plans.pro_yearly.planId}
                    isMonthly={isMonthly}
                />
                <PricingProduct
                    name={'Personal'}
                    description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                    price={isMonthly ? platformConfig.pricing.plans.business.price : platformConfig.pricing.plans.business_yearly.price}
                    plan={Plans.BUSINESS}
                    features={features}
                    recommended={true}
                    planId={isMonthly ? platformConfig.pricing.plans.business.planId : platformConfig.pricing.plans.business_yearly.planId}
                    isMonthly={isMonthly}
                />
                <PricingProduct
                    name={'Startup'}
                    description={'Ideal for getting started with desktop funnels and achieving your first successes.'}
                    price={isMonthly ? platformConfig.pricing.plans.advanced.price : platformConfig.pricing.plans.advanced_yearly.price}
                    plan={Plans.ADVANCED}
                    features={features}
                    planId={isMonthly ? platformConfig.pricing.plans.advanced.planId : platformConfig.pricing.plans.advanced_yearly.planId}
                    isMonthly={isMonthly}
                />
            </section>
        </div>
    )
}
