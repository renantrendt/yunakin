import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import Sidebar from '@/components/navigation/Sidebar'
import DashboardNavbar from '@/components/dashboard/navbar/Navbar'

export default function Dashboard(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = useFeatureFlag('newDashboard')

    return (
        <div> Dashboard</div>
    )
}
