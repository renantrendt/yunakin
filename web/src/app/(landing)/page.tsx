
'use client'
import React from 'react'
import Hero from '@/components/hero/Hero'
import FAQ from '@/components/section/faq/FAQ'
import Testimonial from '@/components/section/testimonial/Testimonial'
import Features from '@/components/features/features'
import Cta from '@/components/section/cta/cta'
import { InfiniteMovingCards } from '@/components/atomic/infinite-moving-cards'

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col  mx-auto px-4 md:px-28 max-w-8xl">
      <Hero />
      {/* <TrustedBy /> */}
      <InfiniteMovingCards items={
        [
          {
            name: 'John Doe',
            title: 'CEO, Company',
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        ]
      } />
      <Cta />
      <Features />
      <Testimonial />
      <FAQ />
    </main>
  )
}
