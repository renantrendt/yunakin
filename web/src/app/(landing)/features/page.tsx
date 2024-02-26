'use client'
import Features from '@/components/features/features'
import FAQ from '@/components/section/faq/FAQ'
import React from 'react'

const FeaturePage = () => {
    return (
        <main className="flex min-h-screen  flex-col  mx-auto px-4 md:px-28 max-w-8xl">
            <Features />
            <FAQ />
        </main>
    )
}

export default FeaturePage;