"use client";
import React from 'react'
import DealBookAnalyticsSection from './section/DealBookAnalyticsSection'
import Typography from '../atomic/typography/Typography'
import { DateRangePicker } from '../date-range/date-range-input'
import WarningIcon from '@/icons/toast/warning-icon.svg';
import PartnerDealBookAnalyticsSection from './section/PartnerDealBookAnalyticsSection';
import { DateRange } from 'react-day-picker';
import { init } from 'next/dist/compiled/webpack/webpack';

interface AnalyticsPageContainerProps {
    hasData: boolean
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
    partnerCardStats: {
        totalPartners: number;
        totalWaitingPartners: number;
        pageViews: number;
    }
    partnerStats: {
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

const AnalyticsPageContainer = ({ hasData, partnerCardStats, partnerStats, cardStats, chartStats }: AnalyticsPageContainerProps) => {
    const initialDateFrom = new Date(new Date().setDate(new Date().getDate() - 7))
    const [initialDate, setInitialDate] = React.useState({ from: initialDateFrom, to: initialDateFrom })

    const onDateChange = (values: { from: Date, to: Date }) => {
        setInitialDate({
            from: values.from,
            to: values.from
        })
    }
    return (
        <div className='  py-4   lg:px-12'>
            {!hasData && <div className='warning mx-3 lg:mx-0  bg-white py-3 px-4 flex gap-2 flex-row items-center mb-7'>
                <div className='w-fit flex-shrink-0'>
                    <WarningIcon />
                </div>
                <Typography type='p' className='text-black font-medium font-satoshi text-sm leading-normal'>This is a demo screen. The analytics on this page are not real. It will be updated after you start receiving the first click.</Typography>
            </div>
            }
            <div className='flex gap-3 justify-between'>
                <div className='flex w-full justify-between flex-row'>
                    <Typography type='h3' className='text-black font-semibold !text-lg font-satoshi'>Dealbook Performance</Typography>
                </div>
                <DateRangePicker
                    onUpdate={(values) => {
                        const from = new Date(values.range.from.toDateString())
                        const to = values.range.to
                        onDateChange({
                            from,
                            to: to as Date
                        })
                    }}
                    initialDateFrom={initialDate.from}
                    initialDateTo={initialDate.to}
                    align="start"
                    locale="en-GB"
                    showCompare={false}
                />
            </div>

            <DealBookAnalyticsSection
                cardStats={cardStats}
                chartStats={chartStats}
            />
            <PartnerDealBookAnalyticsSection
                cardStats={partnerCardStats}
                stats={partnerStats}
            />
        </div>
    )
}

export default AnalyticsPageContainer