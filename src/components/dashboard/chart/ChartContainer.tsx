'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'


interface ChartContainerProps {
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

const ChartContainer = ({ benefitClicks, companyClicks, totalClicks, totalCompanyClicks, totalClaims, beenfitsClaims }: ChartContainerProps) => {
    const charts = [
        {
            title: 'Member Benefits Clicks',
            summary: totalClicks,
            children: <BarChart name='Clicks' items={benefitClicks} />
        },

        {
            title: 'Company Clicks',
            summary: totalCompanyClicks,
            children: <BarChart name='All Member Benefit Clicks' items={companyClicks} />
        },
        {
            title: 'Member Benefits Claims',
            summary: totalClaims,
            children: <BarChart name='Benefit Claims' items={beenfitsClaims} />
        },
    ]
    return (
        <div className='chart-container grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2'>
            {charts.map((chart, index) => (
                <ChartCard key={index} title={chart.title} summary={chart.summary}>
                    {chart.children}
                </ChartCard>
            ))}
        </div>
    )
}

export default ChartContainer