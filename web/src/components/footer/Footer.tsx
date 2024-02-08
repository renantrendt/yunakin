import siteUrls from '@/config/site-config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Typography from '../atomic/typography/Typography'
export default function Footer(): JSX.Element {
    return (
        <footer className="footer max-w-[1440px]  md:h-[50vh] grid grid-cols-9 grid-flow-row-dense  lg:grid-cols-9 px-4 md:px-28 text-base-content w-full  pt-24 pb-2">
            {/* <div className='container  mx-auto h-full w-full '> */}
            <div className='flex flex-col col-span-9 lg:col-span-3 justify-start items-start'>
                <Link href={siteUrls.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
                <Typography type='p' className=' !font-light'>
                    Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet
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

            <div className='col-span-2 lg:col-span-3 flex justify-end pb-4 '>
                <p>@2024 Company</p>
            </div>
            {/* <form>
                <header className="footer-title">Newsletter</header>
                <fieldset className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                    </div>
                </fieldset>
            </form> */}
            {/* </div > */}
        </footer >
    )
}
