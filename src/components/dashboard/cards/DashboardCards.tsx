import React from 'react'
import DashboardCard from './DashboardCard'

interface DashboardCardsProps {

    cardStats: {
        totalBenefits: number;
        totalWaitingBenefits: number;
        pageViews: number;
    }

}

export const DashboardCards = ({ cardStats }: DashboardCardsProps) => {
    const { totalWaitingBenefits, totalBenefits } = cardStats;
    const data = [
        {
            title: "Page Views",
            quantity: cardStats.pageViews,
            increase: 21
        },

        {
            title: "Live Deals",
            quantity: totalBenefits,
            increase: 21
        },
        {
            title: "Deals Waiting Your Approval",
            quantity: totalWaitingBenefits,
            increase: 21
        },
    ]
    return (
        <div className='grid grid-cols-2 md:grid-cols-3  gap-x-6 mb-8 '>
            {data.map((item, index) => (
                <DashboardCard key={index} title={item.title} quantity={item.quantity} increase={item.increase} />
            ))}
        </div>
    )
}
