'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'
import { AnalyticsChartNumberStats, AnalyticsChartStats } from '@/lib/types'


interface DealBookChartContainerProps {
    chartStats: AnalyticsChartStats
    chartNumberStats: AnalyticsChartNumberStats
}

const DealBookChartContainer = ({ chartStats, chartNumberStats }: DealBookChartContainerProps) => {
    const { benefitsClaims, benefitsLiveAds, benefitsSaves, benefitsClicks } = chartStats
    const { totalClaims, totalClicks, totalSaves } = chartNumberStats
    const charts = [
        {
            title: 'Clicks by Deal',
            summary: totalClicks,
            children: <BarChart name='Clicks' items={benefitsClicks} />
        },

        {
            title: 'Saved Deals',
            summary: totalSaves,
            children: <BarChart name='All Member Benefit Saves' items={benefitsSaves} />
        },
        {
            title: 'Claimed Deals',
            summary: totalClaims,
            children: <BarChart name='All Member Benefit Claims' items={benefitsClaims} />
        },
        {
            title: 'Live Ads',
            summary: benefitsLiveAds.reduce((acc, curr) => acc + curr.count, 0),
            children: <PieChart name='whatever' items={benefitsLiveAds} />
        },
    ]
    return (
        <div className='chart-container grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-8 mt-2'>
            {charts.map((chart, index) => (
                <ChartCard key={index} title={chart.title} summary={chart.summary}>
                    {chart.children}
                </ChartCard>
            ))}
        </div>
    )
}

export default DealBookChartContainer