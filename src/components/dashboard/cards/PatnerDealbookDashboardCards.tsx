import React from 'react'
import DashboardCard from './DashboardCard'

interface PartnerDealbookDashboardCardsProps {

    cardStats: {
        totalPartners: number;
        totalWaitingPartners: number;
        pageViews: number;
    }

}

export const PartnerDealbookDashboardCards = ({ cardStats }: PartnerDealbookDashboardCardsProps) => {
    const { totalPartners, pageViews, totalWaitingPartners } = cardStats;
    const data = [
        {
            title: "Page Views",
            quantity: cardStats.pageViews,
            increase: 21
        },

        {
            title: "Partners",
            quantity: totalPartners,
            increase: 21
        },
        {
            title: "Waiting Approval",
            quantity: totalWaitingPartners,
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
