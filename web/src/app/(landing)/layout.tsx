import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/navbar'
import React from 'react'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default LandingLayout