'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
import AreaChart from './area/AreaChart'
import PieChart from './pie/PieChart'
import ChartCard from './ChartCard'


interface PartnerDealbookChartContainerProps {
    stats: {
        partnerPageViews: {
            title: string
            count: number
        }[]
        clicksByDeal: {
            title: string
            count: number
        }[]
        claimsByDeal: {
            title: string
            count: number
        }[]
        savesByDeal: {
            title: string
            count: number
        }[]
        revenueByAds: {
            title: string
            count: number
        }[]
        totalPageViews: number
        totalClicks: number
        totalClaims: number
        totalSaves: number
    }
}

const PartnerDealbookChartContainer = ({ stats }: PartnerDealbookChartContainerProps) => {
    const { partnerPageViews, clicksByDeal, claimsByDeal, totalClaims, totalClicks, revenueByAds, totalSaves, savesByDeal, totalPageViews } = stats
    const charts = [
        {
            title: 'Pageviews by Partner',
            summary: totalPageViews,
            children: <BarChart name='Clicks' items={partnerPageViews} />
        },

        {
            title: 'Clicks by Deal',
            summary: totalClicks,
            children: <BarChart name='All Member Benefit Clicks' items={clicksByDeal} />
        },
        {
            title: 'Saved Deals',
            summary: totalSaves,
            children: <BarChart name='All Member Benefit Clicks' items={savesByDeal} />
        },
        {
            title: "Claimed Deals",
            summary: totalClaims,
            children: <BarChart name="All Member Benefit claims" items={claimsByDeal} />
        },
        {
            title: 'Revenue by Ads',
            summary: revenueByAds.reduce((acc, curr) => acc + curr.count, 0),
            children: <PieChart name='Revenue' items={revenueByAds} />
        }
    ]
    return (
        <div className='chart-container grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 mt-2'>
            {charts.map((chart, index) => (
                <ChartCard key={index} title={chart.title} summary={chart.summary}>
                    {chart.children}
                </ChartCard>
            ))}
        </div>
    )
}

export default PartnerDealbookChartContainer