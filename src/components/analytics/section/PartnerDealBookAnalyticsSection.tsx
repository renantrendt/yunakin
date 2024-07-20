import Typography from '@/components/atomic/typography/Typography';
import { PartnerDealbookDashboardCards } from '@/components/dashboard/cards/PatnerDealbookDashboardCards';
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer';
import PartnerDealbookChartContainer from '@/components/dashboard/chart/PartnerDealbookChartContainer';
import React from 'react'

interface PartnerDealBookAnalyticsSectionProps {
    cardStats: {
        totalPartners: number;
        totalWaitingPartners: number;
        pageViews: number;
    }
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

const PartnerDealBookAnalyticsSection = ({ cardStats, stats }: PartnerDealBookAnalyticsSectionProps) => {
    return (
        <div className='dealbook p-6 my-6 bg-[#F3F1F1] flex flex-col gap-8 rounded-2xl'>
            <div className='flex w-full justify-between flex-row'>
                <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Dealbook</Typography>

            </div>
            <PartnerDealbookDashboardCards cardStats={cardStats} />
            <PartnerDealbookChartContainer
                stats={stats}
            />
        </div>
    )
}

export default PartnerDealBookAnalyticsSection