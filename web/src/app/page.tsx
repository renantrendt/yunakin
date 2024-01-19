
'use client'
import React from 'react'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/navbar'
import Pricing from '@/components/pricing/pricing'
import FAQ from '@/components/faq/FAQ'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  mx-auto p-2 md:px-24">
      <Navbar />
      <Hero />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
