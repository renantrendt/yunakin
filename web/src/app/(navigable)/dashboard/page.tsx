import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import ChartContainer from '@/components/dashboard/chart/ChartContainer'

export default function Dashboard(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = useFeatureFlag('newDashboard')

    return (
        <div> <h1>Dashboard</h1>
            <ChartContainer />
        </div>
    )
}
