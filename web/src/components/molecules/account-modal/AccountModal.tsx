import Avatar from '@/components/atomic/avatar/Avatar';
import NavigationItem from '@/components/atomic/navigation/NavigationItem';
import siteUrls from '@/config/site-config';
import { cn } from '@/utils/cn';
import { signOut } from 'next-auth/react';
import React from 'react'
import SettingsIcon from "@/icons/settings.svg"

import ArrowLeftOnIcon from "@/icons/arrow-left-on-icon.svg"

interface AccountModalProps {
    name: string;
    image: string;
    email: string;
    shown: boolean;
}


const AccountModal = ({ name, image, email, shown }: AccountModalProps) => {
    return (
        <div className={cn('flex flex-col gap-6 p-4 rounded-lg justify-start content duration-150 ease-in-out absolute top-10 bg-grey-100 dark:bg-card-dark right-0', shown ? "opacity-100" : "opacity-0")}>
            <div className='flex flex-row gap-4'>
                <Avatar image={image} name={name} />
                <div className='flex text-grey-400 dark:text-white flex-col gap-2'>
                    <p className='text-sm font-semibold leading-5'>{name}</p>
                    <p className='text-sm font-normal leading-5'>{email}</p>
                </div>
            </div>
            <ul className='flex flex-col w-full'>
                <NavigationItem
                    title="Settings"
                    link={siteUrls.general.settings}
                    icon={<SettingsIcon />}
                />
                <NavigationItem
                    title="Log Out"
                    link={siteUrls.general.settings}
                    icon={<ArrowLeftOnIcon />}
                    onClick={async () => { await signOut({ callbackUrl: "/ " }) }}
                />
            </ul>
        </div>
    )
}

export default AccountModal