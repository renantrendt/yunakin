import Typography from '@/components/atomic/typography/Typography';
import { PartnerDealbookDashboardCards } from '@/components/dashboard/cards/PatnerDealbookDashboardCards';
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer';
import PartnerDealbookChartContainer from '@/components/dashboard/chart/PartnerDealbookChartContainer';
import { AnalyticsPartnerCardStats, AnalyticsPartnerChartNumberStats, AnalyticsPartnerChartStats } from '@/lib/types';
import React from 'react'

interface PartnerDealBookAnalyticsSectionProps {
    cardStats: AnalyticsPartnerCardStats
    partnerChartNumberStats: AnalyticsPartnerChartNumberStats
    partnerChartStats: AnalyticsPartnerChartStats
}

const PartnerDealBookAnalyticsSection = ({ cardStats, partnerChartNumberStats, partnerChartStats }: PartnerDealBookAnalyticsSectionProps) => {
    return (
        <div className='dealbook p-3 lg:p-6 my-6 bg-[#F3F1F1] flex flex-col gap-4 lg:gap-8 rounded-2xl'>
            <div className='flex w-full justify-between flex-row'>
                <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Partner Dealbook</Typography>

            </div>
            <PartnerDealbookDashboardCards cardStats={cardStats} />
            <PartnerDealbookChartContainer
                partnerChartNumberStats={partnerChartNumberStats}
                partnerChartStats={partnerChartStats}
            />
        </div>
    )
}

export default PartnerDealBookAnalyticsSection