'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Cta from '@/components/section/cta/cta'
import UsedBy from '@/components/section/usedBy/UsedBy'
import ContentSection from '@/containers/layout/ContentSection'
import Features from '@/components/features/features'
import Pricing from '@/components/section/pricing/pricing'

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
      <ContentSection
        fullWidth
        additionalClassName='bg-primary-500'
      >
        <Cta />
      </ContentSection>
      <ContentSection>
        <Features />
      </ContentSection>
      <ContentSection
        fullWidth
        additionalClassName='bg-primary-500'>
        <Testimonial />
      </ContentSection>
      <ContentSection>
        <Pricing showDescription={true} />
      </ContentSection>
      <ContentSection>
        <FAQ />
      </ContentSection>
    </main>
  )
}
