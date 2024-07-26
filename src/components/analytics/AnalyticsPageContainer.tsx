"use client";
import React, { useEffect } from 'react'
import DealBookAnalyticsSection from './section/DealBookAnalyticsSection'
import Typography from '../atomic/typography/Typography'
import { DateRangePicker } from '../date-range/date-range-input'
import WarningIcon from '@/icons/toast/warning-icon.svg';
import PartnerDealBookAnalyticsSection from './section/PartnerDealBookAnalyticsSection';
import { DateRange } from 'react-day-picker';
import { init } from 'next/dist/compiled/webpack/webpack';
import { AnalyticsResponse } from '@/lib/types';
import customToast from '../atomic/toast/customToast';
import { fetchAnalyticsData } from '@/app/actions';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash'
interface AnalyticsPageContainerProps {
    hasData: boolean
    analyticsData: AnalyticsResponse
}

const initialDateFrom = new Date(new Date().setDate(new Date().getDate() - 7))
const initialDateTo = new Date(new Date().setDate(new Date().getDate()))

const AnalyticsPageContainer = ({ hasData, analyticsData }: AnalyticsPageContainerProps) => {
    const [analytics, setAnalytics] = React.useState(analyticsData)
    const [initialDate, setInitialDate] = React.useState({ from: initialDateFrom, to: initialDateTo })
    const dateChangeMutation = useMutation({
        mutationFn: async (values: { from: Date, to: Date }) => {
            const analytics = await fetchAnalyticsData(values)
            return analytics
        },
        onError: (error, values, context) => {
            customToast.error('Failed to fetch analytics data'),
                console.log('error', error)
        },
        onSuccess(data, variables, context) {
            if (data) {
                setAnalytics(_.cloneDeep(data))
            }
        },
        networkMode: 'online'
    })

    useEffect(() => {
        console.log('analyticsData', analyticsData)
    }, [analyticsData])
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
                    onUpdate={async (values) => {
                        if (!hasData) return
                        const from = new Date(values.range.from.toDateString())
                        const to = values.range.to
                        if (!to) return
                        await dateChangeMutation.mutateAsync({ from, to })
                        setInitialDate({
                            from: from,
                            to: to
                        })
                    }}
                    initialDateFrom={initialDate.from}
                    initialDateTo={initialDate.to}
                    align="start"
                    locale="en-GB"
                    loading={dateChangeMutation.isPending}
                    success={dateChangeMutation.isSuccess}
                    showCompare={false}
                />
            </div>

            <DealBookAnalyticsSection
                cardStats={analytics.cardStats}
                chartStats={analytics.chartStats}
                chartNumberStats={analytics.chartNumberStats}
            />
            <PartnerDealBookAnalyticsSection
                cardStats={analytics.partnerCardStats}
                partnerChartStats={analytics.partnerChartStats}
                partnerChartNumberStats={analytics.partnerChartNumberStats}
            />
        </div>
    )
}

export default AnalyticsPageContainer