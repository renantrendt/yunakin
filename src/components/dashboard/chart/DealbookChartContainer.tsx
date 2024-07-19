'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'


interface DealBookChartContainerProps {
    benefitClicks: {
        title: string
        count: number
    }[]
    beenfitsClaims: {
        title: string
        count: number
    }[]
    companyClicks: {
        title: string
        count: number
    }[]
    // benefitsByOs: {
    //     title: string
    //     count: number
    // }[]
    totalClicks: number
    totalClaims: number
    totalCompanyClicks: number
}

const DealBookChartContainer = ({ benefitClicks, companyClicks, totalClicks, totalCompanyClicks, totalClaims, beenfitsClaims }: DealBookChartContainerProps) => {
    const charts = [
        {
            title: 'Clicks by Deal',
            summary: totalClaims,
            children: <BarChart name='Clicks' items={beenfitsClaims} />
        },

        {
            title: 'Saved Deals',
            summary: totalClicks,
            children: <BarChart name='All Member Benefit Clicks' items={benefitClicks} />
        },
        {
            title: 'Live Ads',
            summary: 2122,
            children: <PieChart name='whatever' items={beenfitsClaims} />
        },
    ]
    return (
        <div className='chart-container grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-y-8 mt-2'>
            {charts.map((chart, index) => (
                <ChartCard key={index} title={chart.title} summary={chart.summary}>
                    {chart.children}
                </ChartCard>
            ))}
        </div>
    )
}

export default DealBookChartContainer