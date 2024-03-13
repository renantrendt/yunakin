import Avatar from '@/components/atomic/avatar/Avatar'
import { ThemeSwitcher } from '@/components/atomic/theme/ThemeSwitcher'
import Typography from '@/components/atomic/typography/Typography'
import { useSession } from 'next-auth/react'
import React from 'react'
import NotificationIcon from "@/icons/notification-icon.svg"
import AccountModal from '@/components/molecules/account-modal/AccountModal'
const Topbar = () => {
    const { data: session } = useSession()
    const [show, setShow] = React.useState(false)
    return (
        <div className='flex justify-between px-2 py-[10px] w-full items-center'>
            <Typography type='h1' className='!text-xl'>Welcome {session?.user?.name}</Typography>
            <div className='flex justify-center gap-2'>
                <ThemeSwitcher />
                <div className="cursor-pointer p-[10px] bg-grey-100 text-grey-600 w-fit h-fit dark:bg-icon-dark dark:text-white rounded-full">
                    <NotificationIcon />
                </div>
                <div className='relative'>
                    <Avatar onMouseEnter={() => setShow(true)} onClick={() => { setShow(!show) }} tabIndex={0} role="button" image={session?.user?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} name={session?.user?.name ?? ""} />
                    <AccountModal email={session?.user?.email as string}
                        name={session?.user?.name || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                        image={session?.user?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} shown={show}
                    />
                </div>
            </div>

        </div >
    )
}

export default Topbar