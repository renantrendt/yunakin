import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/navbar'
import React from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-[#FAFAFA]'>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default LandingLayout