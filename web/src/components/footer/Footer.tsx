import siteUrls, { siteCopy } from '@/config/site-config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Typography from '../atomic/typography/Typography'
export default function Footer(): JSX.Element {
    return (
        <footer className="footer max-w-[1440px]  md:h-[50vh] grid grid-cols-9 grid-flow-row-dense  lg:grid-cols-9 px-4 md:px-28 text-base-content w-full  pt-24 pb-2">
            {/* <div className='container  mx-auto h-full w-full '> */}
            <div className='flex flex-col col-span-9 lg:col-span-3 justify-start items-start'>
                <Link href={siteUrls.general.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
                <Typography type='p' className=' !font-light'>
                    {siteCopy.footer.description}
                </Typography>
            </div>
            <div className='grid  col-span-9 lg:col-start-5 grid-cols-2 lg:grid-cols-4 w-full lg:col-span-6 gap-y-16'>
                <nav className='flex flex-col gap-4'>
                    <header className="footer-title">Services</header>
                    <Link href='/' className="link link-hover">Branding</Link>
                    <Link href='/' className="link link-hover">Design</Link>
                    <Link href='/' className="link link-hover">Marketing</Link>
                    <Link href='/' className="link link-hover">Advertisement</Link>
                </nav>
                <nav className='flex flex-col gap-4'>
                    <header className="footer-title">Company</header>
                    <Link href='/' className="link link-hover">About us</Link>
                    <Link href='/' className="link link-hover">Contact</Link>
                    <Link href='/' className="link link-hover">Jobs</Link>
                    <Link href='/' className="link link-hover">Press kit</Link>
                </nav>
                <nav className='flex flex-col gap-4'>
                    <header className="footer-title">Legal</header>
                    <Link href='/tos' className="link link-hover">Terms of use</Link>
                    <Link href='/privacy-policy' className="link link-hover">Privacy policy</Link>
                    <Link href='/' className="link link-hover">Cookie policy</Link>
                </nav>
                <nav className='flex flex-col gap-4'>
                    <header className="footer-title">Legal</header>
                    <Link href='/tos' className="link link-hover">Terms of use</Link>
                    <Link href='/privacy-policy' className="link link-hover">Privacy policy</Link>
                    <Link href='/' className="link link-hover">Cookie policy</Link>
                </nav>
            </div>

            <div className='col-span-12 lg:col-span-10  flex justify-start pb-4 border-t-grey-100 border-t pt-4 border-[#F0F0F0] w-full '>
                <p>{siteCopy.footer.footnote.replaceAll("%Date%", new Date().getFullYear().toString())}</p>
            </div>

        </footer >
    )
}
