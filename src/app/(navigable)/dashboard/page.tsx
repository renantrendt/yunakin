import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import Sidebar from '@/components/navigation/Sidebar'
import DashboardNavbar from '@/components/dashboard/navbar/Navbar'

export default function Dashboard(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = useFeatureFlag('newDashboard')

    return (
        <div className="flex w-full min-w-full">
            <div className='flex   w-full flex-col md:flex-row-reverse justify-start items-start'>
                <DashboardNavbar />
                <Sidebar />
            </div>
        </div>
    )
}
