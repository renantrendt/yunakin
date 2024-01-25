
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/faq/FAQ'
import Testimonial from '@/components/testimonial/Testimonial'
import Features from '@/components/features/features'
import Cta from '@/components/cta/cta'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  mx-auto p-2 md:px-24">
      <Hero />
      <Cta />
      <Features />
      <Testimonial />
      <FAQ />
    </main>
  )
}
