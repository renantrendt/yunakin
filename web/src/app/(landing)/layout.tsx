import Footer from '@/components/footer/Footer'
import Navbar from '@/components/section/navbar/navbar'
import getSeoMetadata from '@/lib/seo/metadata'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
    return getSeoMetadata();
}

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-landing-background flex flex-col dark:bg-gray-800 w-full items-center'>
            <div className='max-w-[1440px] w-full'>
                <Navbar />
                {children}
            </div>
            <div className='bg-white w-full justify-center flex dark:bg-gray-700  dark:text-white'>
                <Footer />
            </div>
        </div >
    )
}

export default LandingLayout