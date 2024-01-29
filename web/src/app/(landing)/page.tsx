
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/faq/FAQ'
import Testimonial from '@/components/testimonial/Testimonial'
import Features from '@/components/features/features'
import Cta from '@/components/cta/cta'
import TrustedBy from '@/components/landing/trustedBy'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  mx-auto px-4 md:px-28 max-w-8xl">
      <Hero />
      <TrustedBy />
      <Cta />
      <Features />
      <Testimonial />
      <FAQ />
    </main>
  )
}
