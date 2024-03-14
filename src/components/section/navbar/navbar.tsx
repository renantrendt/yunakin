'use client'
import Link from 'next/link'
import Button from '../../atomic/button/Button'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import siteUrls from '@/config/site-config'
import HamburgerIcon from '@/icons/HamburgerIcon.svg'
import Image from 'next/image'
import IconButton from '@/components/atomic/icon-button/IconButton'
import _ from 'lodash'
import TopbarNavigationItem from '@/components/atomic/navigation/TopbarNavigationItem'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import ContentSection from '@/containers/layout/ContentSection'
import { ThemeSwitcher } from '@/components/atomic/theme/ThemeSwitcher'
import { useTheme } from 'next-themes'
import AccountModal from '@/components/molecules/account-modal/AccountModal'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/atomic/avatar/Avatar'
export default function Navbar() {
    const pathName = usePathname()
    const router = useRouter()
    const [showMenu, setShowMenu] = React.useState(false)
    const [border, setBorder] = React.useState(false)
    const navRef = React.useRef<HTMLDivElement>(null)
    const { data: session, status } = useSession()
    const { theme } = useTheme()
    const [show, setShow] = React.useState(false)
    const changeNavBg = () => {
        if (!navRef.current) {
            return;
        }
        window.scrollY >= navRef.current?.clientHeight ? setBorder(true) : setBorder(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            window.removeEventListener('scroll', changeNavBg);
        }
    }, [])
    return (
        <ContentSection fullWidth additionalClassName={cn('fixed  bg-landing-background dark:bg-landing-dark-background  bg-landing-background z-50 !py-2 !md:py-6', border && "border-b-[1px] border-grey-200 dark:border-navbar-bottom-dark")}>

            <div ref={navRef} className="  navbar p-0 max-w-8xl     font-medium text-base leading-[19px] text-grey-400 " >
                <div className="navbar-start w-full">

                    <Link href={siteUrls.general.home}>
                        <Image src={theme == "light" ? `/images/logo.svg` : '/images/logo-dark.svg'} alt="logo" width={165} height={96} className='w-full h-full' />
                    </Link>
                </div>
                <div className="navbar-center   hidden lg:flex justify-center">
                    <ul className="menu menu-horizontal px-1 flex gap-1">
                        {_.keys(siteUrls.navbar).map((key: string) => {
                            const link = siteUrls.navbar[key]
                            return (
                                <TopbarNavigationItem
                                    link={link.url}
                                    title={link.label}
                                    key={key}
                                    selected={pathName === link.url}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div className="navbar-end  w-full   gap-3">

                    <div className="dropdown flex justify-end w-full lg:hidden">
                        <ThemeSwitcher />

                        <div className='text-black dark:text-white font-black'>
                            <IconButton icon={<HamburgerIcon />} onClick={() => { setShowMenu(!showMenu) }} className='w-8 h-8' />
                        </div>
                        <ul tabIndex={0} className={cn(showMenu ? " absolute flex" : "hidden", "  mt-8 z-[1] p-8 shadow bg-base-100 dark:bg-card-dark dark:text-profile-modal-text-dark rounded-box w-72  flex-col gap-4")}>
                            {_.keys(siteUrls.navbar).map((key: string) => {
                                const link = siteUrls.navbar[key]
                                return (
                                    <TopbarNavigationItem
                                        link={link.url}
                                        title={link.label}
                                        key={key}
                                        selected={pathName === link.url}
                                    />
                                )
                            })}


                            <li>
                                <Button
                                    variant='tertiary'
                                    label='Login'
                                    size='md'
                                    classname='!min-w-[150px] !w-full '
                                    onClick={() => router.push(siteUrls.general.login)}
                                />
                            </li>
                            <li>

                                <Button
                                    variant='primary'
                                    classname=' !min-w-[150px] !w-full  text-white '
                                    label='Get Started'
                                    size='md'
                                    onClick={() => router.push(siteUrls.general.register)}
                                />
                            </li>

                        </ul>
                    </div>
                    <>
                        <ThemeSwitcher />

                        {session?.user && (<div className='relative' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                            <Avatar onClick={() => { setShow(!show) }} tabIndex={0} role="button" image={session?.user?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} name={session?.user?.name ?? ""} />
                            <AccountModal email={session?.user?.email as string}
                                name={session?.user?.name || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                                image={session?.user?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} shown={show}
                            />
                        </div>)}
                        {
                            !session?.user && status !== "loading" && (
                                <>
                                    <Button
                                        variant='secondary'
                                        label='Login'
                                        size='md'
                                        classname='hidden !min-w-[120px] lg:block'
                                        onClick={() => router.push(siteUrls.general.login)}
                                    />
                                    <Button
                                        variant='primary'
                                        classname=' hidden !min-w-[120px] lg:block'
                                        label='Get Started'
                                        size='md'
                                        onClick={() => router.push(siteUrls.general.register)}
                                    />
                                </>
                            )
                        }
                    </>

                </div>
            </div>
        </ContentSection>
    )
}
