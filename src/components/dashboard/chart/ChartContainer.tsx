'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'


interface ChartContainerProps {
    benefitClicks:{
        title:string
        count:number
    }[]
    benefitsByOs: {
        title:string
        count:number
    }[]
    totalClicks: number
}

const ChartContainer = ({benefitClicks, benefitsByOs, totalClicks}: ChartContainerProps) => {
    
    console.log(benefitClicks)
    console.log(benefitsByOs)
    const charts = [
        {
            title: 'Member Benefits Clicks',
            summary: totalClicks,
            children: <BarChart name='Member Benefits Clicks' items={benefitClicks} />
        },
        {
            title: 'Member Benefits by OS',
            summary: totalClicks,
            children: <BarChart name='Member Benefits Clicks' items={benefitsByOs} />
        },
        // {
        //     title: 'Revenue',
        //     summary: 3000,
        //     children: <AreaChart />
        // },
        // {
        //     title: 'Customers',
        //     summary: 4000,
        //     children: <PieChart />
        // }
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