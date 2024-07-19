import React from 'react'


const MemberBenefitPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' flex flex-col bg-landing-background dark:bg-landing-dark-background  w-full items-center '>
            {children}
            {/* <div className='bg-white dark:bg-landing-dark-background  w-full justify-center flex dark:bg-gray-700  dark:text-white'>
                <Footer />
            </div> */}
        </div >
    )
}

export default MemberBenefitPageLayout