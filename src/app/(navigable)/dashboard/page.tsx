import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import ChartContainer from '@/components/dashboard/chart/ChartContainer'
import { DashboardCards } from '@/components/dashboard/cards/DashboardCards'

export default function Dashboard(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = useFeatureFlag('newDashboard')

    return (
        <div>
            <DashboardCards />
            <ChartContainer />
        </div>
    )
}
