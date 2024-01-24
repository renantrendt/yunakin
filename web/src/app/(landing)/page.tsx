
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import Pricing from '@/components/pricing/pricing'
import FAQ from '@/components/faq/FAQ'
import Testimonial from '@/components/testimonial/Testimonial'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  mx-auto p-2 md:px-24">
      <Hero />
      <Testimonial />
      <Pricing />
      <FAQ />
    </main>
  )
}
