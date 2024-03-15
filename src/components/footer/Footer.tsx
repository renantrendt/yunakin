'use client'
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
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                    <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
                </Link>
                <Typography type='p' className=' !font-light dark:text-sidebar-icon-dark'>
                    {siteCopy.footer.description}
                </Typography>
            </div>
            <div className='grid  col-span-9 lg:col-start-5 grid-cols-2 lg:grid-cols-4 w-full lg:col-span-6 gap-y-16'>
                <nav className='flex flex-col gap-4 dark:text-white'>
                    <header className="ext-base font-medium dark:!text-white">Services</header>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Branding</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Design</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Marketing</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Advertisement</Link>
                </nav>
                <nav className='flex flex-col gap-4 dark:text-white'>
                    <header className="ext-base font-medium dark:!text-white">Company</header>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">About us</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Contact</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Jobs</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Press kit</Link>
                </nav>
                <nav className='flex flex-col gap-4 '>
                    <header className="text-base font-medium dark:!text-white">Legal</header>
                    <Link href='/tos' className="link link-hover dark:text-sidebar-icon-dark">Terms of use</Link>
                    <Link href='/privacy-policy' className="link link-hover dark:text-sidebar-icon-dark">Privacy policy</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Cookie policy</Link>
                </nav>
                <nav className='flex flex-col gap-4'>
                    <header className="text-base font-medium dark:!text-white">Legal</header>
                    <Link href='/tos' className="link link-hover dark:text-sidebar-icon-dark">Terms of use</Link>
                    <Link href='/privacy-policy' className="link link-hover dark:text-sidebar-icon-dark">Privacy policy</Link>
                    <Link href='/' className="link link-hover dark:text-sidebar-icon-dark">Cookie policy</Link>
                </nav>
            </div>

            <div className='col-span-12 lg:col-span-10  flex justify-start pb-4 border-t-grey-100 border-t pt-4 border-[#F0F0F0] w-full dark:border-profile-modal-border-dark '>
                <p className='dark:text-sidebar-icon-dark'>{siteCopy.footer.footnote.replaceAll("%Date%", new Date().getFullYear().toString())}</p>
            </div>

        </footer >
    )
}
