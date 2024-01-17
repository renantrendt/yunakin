import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import Sidebar from '@/components/navigation/Sidebar'
import DashboardNavbar from '@/components/dashboard/navbar/Navbar'

export default function Dashboard(): JSX.Element {
    const _ = useFeatureFlag('newDashboard')

    return (
        <div className="flex">
            <Sidebar />
            <DashboardNavbar />
        </div>
    )
}
