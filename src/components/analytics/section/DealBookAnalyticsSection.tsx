import Typography from '@/components/atomic/typography/Typography';
import { DealbookDashboardCards } from '@/components/dashboard/cards/DealbookDashboardCards';
import { PartnerDealbookDashboardCards } from '@/components/dashboard/cards/PatnerDealbookDashboardCards';
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer';
import React from 'react'

interface DealBookAnalyticsSectionProps {
    cardStats: {
        totalClicks: number;
        totalClaims: number;
        totalBenefits: number;
        totalWaitingBenefits: number;
        pageViews: number;
    }
    chartStats: {
        benefitsClicks: {
            title: string
            count: number
        }[]
        benefitsClaims: {
            title: string
            count: number
        }[]
        otherCompanyClicks: {
            [key: string]: number
        }
    }
}

const DealBookAnalyticsSection = ({ cardStats, chartStats }: DealBookAnalyticsSectionProps) => {
    return (
        <div className='dealbook p-6 my-6 bg-[#F3F1F1] flex flex-col gap-8 rounded-2xl'>
            <div className='flex w-full justify-between flex-row'>
                <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Dealbook</Typography>

            </div>
            <DealbookDashboardCards cardStats={cardStats} />
            <DealBookChartContainer benefitClicks={chartStats.benefitsClicks}
                totalClicks={cardStats.totalClicks}
                totalClaims={cardStats.totalClaims}
                beenfitsClaims={chartStats.benefitsClaims}
                companyClicks={Object.keys(chartStats.otherCompanyClicks).map(key => {
                    return {
                        title: key,
                        count: chartStats.otherCompanyClicks[key]
                    }
                })}
                totalCompanyClicks={Object.keys(chartStats.otherCompanyClicks).map(key => chartStats.otherCompanyClicks[key]).reduce((a, b) => a + b, 0)}
            />
        </div>
    )
}

export default DealBookAnalyticsSection