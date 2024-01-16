import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/navbar'
import Pricing from '@/components/pricing/pricing'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Hero />
      <Pricing />
      <Footer />
    </main>
  )
}
