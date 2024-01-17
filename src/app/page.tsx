
'use client'
import React from 'react'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/navbar'
import Pricing from '@/components/pricing/pricing'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-2">
      <Navbar />
      <Hero />
      <Pricing />
      <Footer />
    </main>
  )
}
