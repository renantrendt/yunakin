import Footer from '@/components/footer/Footer'
import Navbar from '@/components/section/navbar/navbar'
import React from 'react'


const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' flex flex-col bg-landing-background dark:bg-landing-dark-background  w-full items-center '>
            <Navbar />
            {children}
            <div className='bg-white  w-full justify-center flex dark:bg-gray-700  dark:text-white'>
                <Footer />
            </div>
        </div >
    )
}

export default LandingLayout