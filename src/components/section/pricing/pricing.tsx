'use client'
import platformConfig, { Plans } from '@/config/app-config'
import PricingProduct from './pricing-product'
import React from 'react'
import Typography from '@/components/atomic/typography/Typography';
import { useTranslation } from '@/lib/i18n/client';
import AnimatedSection from '@/components/animated/AnimatedSection';



const features = platformConfig.pricing.features;
export default function Pricing({ showDescription = false }: { showDescription?: boolean }) {
    const { t } = useTranslation('landing')
    const [isMonthly, setIsMonthly] = React.useState(false)
    return (
        <div className='py-28 w-full  ' id='pricing'>
            {showDescription && (
                <AnimatedSection className=' flex flex-col justify-center items-center mb-20 gap-5 text-black dark:text-white'>
                    <Typography type='h1' className='!lg:text-[46px] !lg:leading-[64px] text-stone-950 font-semibold text-center mb-2 dark:text-white'>Enable the best experience</Typography>
                    <h3 className=' text-lg lg:text-xl  max-w-[700px] font-normal  leading-[30px] text-center text-neutral-600 dark:text-sidebar-icon-dark'>Choose a plan and start your 14-day free trial. Generate appointments and leads or source talent online, risk-free.</h3>
                </AnimatedSection>
            )}

            <AnimatedSection className='flex justify-center border-[1px] border-grey-500  gap-4 mb-12 items-center mx-auto  hover:cursor-pointer  text-md w-fit  bg-white dark:bg-card-dark dark:text-white dark:border-none rounded-[40px] p-2'>
                <div className={`${isMonthly ? " border-primary " : "border-transparent"} rounded-3xl px-8 py-[10px] border-[2px]  transition duration-150 ease-in-out `} onClick={() => setIsMonthly(true)}>
                    <span className='text-sm font-semibold leading-[140%]'>{t("pricing.monthly")}</span>
                </div>
                <div className={`${!isMonthly ? " border-primary " : "border-transparent"} rounded-3xl px-8 border-[2px]  py-[10px] transition duration-150 ease-in-out`} onClick={() => setIsMonthly(false)}>
                    <span className='text-sm font-semibold leading-[140%]' >{t("pricing.yearly")}</span>
                </div>
            </AnimatedSection>
            <AnimatedSection className='grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full'>
                <PricingProduct
                    name={t("pricing.personal.name")}
                    description={t("pricing.personal.description")}
                    price={isMonthly ? platformConfig.pricing.plans.pro.price : platformConfig.pricing.plans.pro_yearly.price}
                    plan={Plans.PRO}
                    features={features}
                    planId={isMonthly ? platformConfig.pricing.plans.pro.planId : platformConfig.pricing.plans.pro_yearly.planId}
                    isMonthly={isMonthly}
                />
                <PricingProduct
                    name={t("pricing.pro.name")}
                    description={t("pricing.pro.description")}
                    price={isMonthly ? platformConfig.pricing.plans.business.price : platformConfig.pricing.plans.business_yearly.price}
                    plan={Plans.BUSINESS}
                    features={features}
                    recommended={true}
                    planId={isMonthly ? platformConfig.pricing.plans.business.planId : platformConfig.pricing.plans.business_yearly.planId}
                    isMonthly={isMonthly}
                />
                <PricingProduct
                    name={t("pricing.enterprise.name")}
                    description={t("pricing.enterprise.description")}
                    price={isMonthly ? platformConfig.pricing.plans.advanced.price : platformConfig.pricing.plans.advanced_yearly.price}
                    plan={Plans.ADVANCED}
                    features={features}
                    planId={isMonthly ? platformConfig.pricing.plans.advanced.planId : platformConfig.pricing.plans.advanced_yearly.planId}
                    isMonthly={isMonthly}
                />
            </AnimatedSection>
        </div>
    )
}
