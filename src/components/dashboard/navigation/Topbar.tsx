"use client"
import Avatar from '@/components/atomic/avatar/Avatar'
import { ThemeSwitcher } from '@/components/atomic/theme/ThemeSwitcher'
import Typography from '@/components/atomic/typography/Typography'
import { useSession } from 'next-auth/react'
import React from 'react'
import NotificationIcon from "@/icons/notification-icon.svg"
import AccountModal from '@/components/molecules/account-modal/AccountModal'
import NotificationModal from '@/components/molecules/notification-modal/NotificationModal'
import Notification from '@/lib/models/notification'
import { cn } from '@/utils/cn'
import ChangeLocale from '@/components/locale/ChangeLocale'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/client'
const Topbar = () => {
    const { data: session } = useSession()
    const [show, setShow] = React.useState(false)
    const [showNotification, setShowNotifications] = React.useState(false)
    const { t } = useTranslation('dashboard')
    const pathname = usePathname()
    return (
        <div className='flex !bg-white  justify-between px-2 py-[10px] w-full items-center'>
            <Typography type='h1' className='!text-base !md:text-xl'>{t(`pages.${pathname.replace("/", "")}.title`)}</Typography>
            <div className='flex justify-center gap-2'>
                {/* <ThemeSwitcher /> */}
                {/* <ChangeLocale /> */}
                {/* <div className='relative'>
                    <div onClick={() => setShowNotifications(!showNotification)} className={cn("cursor-pointer p-[10px] bg-grey-100 text-grey-600 hover:bg-primary-500 focus:bg-primary-500  w-fit h-fit dark:bg-icon-dark dark:hover:bg-primary-500 dark:focus:bg-primary-500  hover:text-white focus:text-white dark:text-white rounded-full", showNotification ? "!bg-primary-500 !text-white" : "")} >
                        <NotificationIcon />

                    </div>
                    <NotificationModal
                        notifications={notifications}
                        shown={showNotification}
                    />
                </div> */}
                <div className='relative' onMouseLeave={() => setShow(false)}>
                    <Avatar onMouseEnter={() => setShow(true)} onClick={() => { setShow(!show) }} tabIndex={0} role="button" image={session?.user?.avatar || "/images/dummy_logo.svg"} name={session?.user?.name ?? ""} />
                    {show && <AccountModal email={session?.user?.email as string}
                        name={session?.user?.name ?? ""}
                        image={session?.user?.avatar || "/images/dummy_logo.svg"} shown={show}
                    />}
                </div>
            </div>
        </div >
    )
}

export default Topbar