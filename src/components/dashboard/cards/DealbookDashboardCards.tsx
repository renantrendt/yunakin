import React from 'react'
import DashboardCard from './DashboardCard'

interface DealbookDashboardCardsProps {

    cardStats: {
        totalBenefits: number;
        totalWaitingBenefits: number;
        pageViews: number;
    }

}

export const DealbookDashboardCards = ({ cardStats }: DealbookDashboardCardsProps) => {
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
        <div className='grid grid-cols-2 md:grid-cols-3  gap-x-6 gap-y-6 mb-4 lg:mb-8 '>
            {data.map((item, index) => (
                <DashboardCard key={index} title={item.title} quantity={item.quantity} increase={item.increase} />
            ))}
        </div>
    )
}
