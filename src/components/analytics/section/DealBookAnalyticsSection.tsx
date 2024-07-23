import Typography from '@/components/atomic/typography/Typography';
import { DealbookDashboardCards } from '@/components/dashboard/cards/DealbookDashboardCards';
import { PartnerDealbookDashboardCards } from '@/components/dashboard/cards/PatnerDealbookDashboardCards';
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer';
import { AnalyticsCardStats, AnalyticsChartNumberStats, AnalyticsChartStats } from '@/lib/types';
import React from 'react'

interface DealBookAnalyticsSectionProps {
    cardStats: AnalyticsCardStats
    chartNumberStats: AnalyticsChartNumberStats
    chartStats: AnalyticsChartStats
}

const DealBookAnalyticsSection = ({ cardStats, chartStats, chartNumberStats }: DealBookAnalyticsSectionProps) => {
    return (
        <div className='dealbook p-3  lg:p-6 my-6 mt-4 bg-[#F3F1F1] flex flex-col gap-4 lg:gap-8 rounded-2xl'>
            <div className='flex w-full justify-between flex-row'>
                <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Dealbook</Typography>
            </div>
            <DealbookDashboardCards cardStats={cardStats} />
            <DealBookChartContainer
                chartStats={chartStats}
                chartNumberStats={chartNumberStats}
            />
        </div>
    )
}

export default DealBookAnalyticsSection