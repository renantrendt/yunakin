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
            title: 'Benefits that your members are saving at your members benefits public page',
            summary: totalClicks,
            children: <BarChart name='Clicks' items={benefitClicks} />
        },

        {
            title: 'Benefits listed from my company that was saved at other companies public members page',
            summary: totalCompanyClicks,
            children: <BarChart name='All Member Benefit Clicks' items={companyClicks} />
        },
        {
            title: 'Clicks on the website of the benefits listed on my public members page',
            summary: totalClaims,
            children: <BarChart name='Benefit Claims' items={beenfitsClaims} />
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

export default ChartContainer