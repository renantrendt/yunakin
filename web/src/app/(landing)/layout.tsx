import Footer from '@/components/footer/Footer'
import Navbar from '@/components/section/navbar/navbar'
import React from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-landing-background  dark:bg-gray-800 w-full flex justify-center'>
            <div className='max-w-[1920px]'>
                <Navbar />
                {children}
                <Footer />
            </div>

        </div>
    )
}

export default LandingLayout