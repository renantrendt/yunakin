
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Cta from '@/components/section/cta/cta'
import UsedBy from '@/components/section/usedBy/UsedBy'
import ContentSection from '@/containers/layout/ContentSection'
import Features from '@/components/features/features'

export default function Home() {
    return (
        <main className="flex min-h-screen  flex-col w-full ">
            <ContentSection
            >
                <Hero />
            </ContentSection>
            <ContentSection>
                <UsedBy />
            </ContentSection>
            <div className='w-full min-w=full bg-primary-500'>
                <div className={'max-w-[1440px] w-full mx-auto px-4 md:px-28'}>
                    <Cta />
                </div>
            </div>
            <ContentSection>
                <Features />
            </ContentSection>
            <div className='w-full min-w=full bg-primary-500'>
                <div className={'max-w-[1440px] w-full mx-auto px-4 md:px-28'}>
                    <Testimonial />
                </div>
            </div>
            <ContentSection>
                <FAQ />
            </ContentSection>
        </main>
    )
}
