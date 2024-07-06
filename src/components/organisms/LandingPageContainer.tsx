'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Cta from '@/components/section/cta/cta'
import UsedBy from '@/components/section/usedBy/UsedBy'
import Features from '@/components/features/features'
import Pricing from '@/components/section/pricing/pricing'
import Acquisition from '../acquisition/acquisition'
const LandingPageContainer = () => {
    return (
        <>
            <Hero />
            <UsedBy />
            <Cta />
            <Acquisition />
            <Features />
            {/* <Testimonial />
            <Pricing showDescription={true} />
            <FAQ /> */}
        </>
    )
}

export default LandingPageContainer