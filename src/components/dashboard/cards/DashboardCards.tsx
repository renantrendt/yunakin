import React from 'react'
import DashboardCard from './DashboardCard'

interface DashboardCardsProps {

    cardStats: {
        totalClicks: number;
        totalMobileClicks: number;
        totalDesktopClicks: number;
        totalClaims: number;
        pageViews: number;
    }

}

export const DashboardCards = ({ cardStats }: DashboardCardsProps) => {
    const { totalClicks, totalMobileClicks, totalDesktopClicks, totalClaims } = cardStats;
    const data = [
        {
            title: "Total Clicks",
            quantity: totalClicks,
            increase: 21
        },
        {
            title: "Total Claims",
            quantity: totalClaims,
            increase: 21
        },
        {
            title: "Page Views",
            quantity: cardStats.pageViews,
            increase: 21
        }

    ]
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 mb-8 '>
            {data.map((item, index) => (
                <DashboardCard key={index} title={item.title} quantity={item.quantity} increase={item.increase} />
            ))}
        </div>
    )
}
