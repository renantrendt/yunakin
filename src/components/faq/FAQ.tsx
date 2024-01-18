import React from 'react'

const FAQ = () => {
    return (
        <div className='container flex flex-col md:flex-row justify-center items-center gap-4'>
            <div className='text flex flex-col justify-center md:justify-start'>
                <h5 className='text-primary'>FAQ</h5>
                <h1 className='font-bold text-2xl'>Frequently Asked Questions</h1>
            </div>
            <div className='faq-list flex flex-col'>
                <div className=" flex justify-between  border-b-2 border-b-black last:border-none">
                    <h3>What do I get exactly</h3>

                </div>
            </div>
        </div>
    )
}

export default FAQ