import Typography from '@/components/atomic/typography/Typography';
import { DealbookDashboardCards } from '@/components/dashboard/cards/DealbookDashboardCards';
import { PartnerDealbookDashboardCards } from '@/components/dashboard/cards/PatnerDealbookDashboardCards';
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer';
import React from 'react'

interface DealBookAnalyticsSectionProps {
    cardStats: {
        totalBenefits: number;
        totalWaitingBenefits: number;
        pageViews: number;
    }
    chartStats: {
        totalSaves: number;
        totalClicks: number;
        totalClaims: number;
        benefitsClicks: {
            title: string
            count: number
        }[]
        benefitsClaims: {
            title: string
            count: number
        }[]
        benefitsSaves: {
            title: string
            count: number
        }[]
        benefitsLiveAds: {
            title: string
            count: number
        }[]
    }
}

const DealBookAnalyticsSection = ({ cardStats, chartStats }: DealBookAnalyticsSectionProps) => {
    return (
        <div className='dealbook p-6 my-6 bg-[#F3F1F1] flex flex-col gap-8 rounded-2xl'>
            <div className='flex w-full justify-between flex-row'>
                <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Dealbook</Typography>

            </div>
            <DealbookDashboardCards cardStats={cardStats} />
            <DealBookChartContainer
                chartStats={chartStats}
            />
        </div>
    )
}

export default DealBookAnalyticsSection