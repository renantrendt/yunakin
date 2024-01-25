'use client'
import FAQ from '@/components/faq/FAQ'
import Pricing from '@/components/pricing/pricing'
import React from 'react'

const PricingPage = () => {
    return (
        <main className="flex min-h-screen flex-col  mx-auto p-2 md:px-24">
            <Pricing />
            <FAQ />
        </main>
    )
}

export default PricingPage