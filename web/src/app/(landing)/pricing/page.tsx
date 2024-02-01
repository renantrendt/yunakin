'use client'
import FAQ from '@/components/section/faq/FAQ'
import Pricing from '@/components/section/pricing/pricing'
import React from 'react'

const PricingPage = () => {
    return (
        <main className="flex min-h-screen flex-col   mx-auto px-4 md:px-28 max-w-8xl">
            <Pricing showDescription={true} />
            <FAQ />
        </main>
    )
}

export default PricingPage