
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Features from '@/components/features/features'
import Cta from '@/components/section/cta/cta'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  mx-auto px-4 md:px-28 max-w-8xl">
      <Hero />
      {/* <TrustedBy /> */}
      <Cta />
      <Features />
      <Testimonial />
      <FAQ />
    </main>
  )
}
