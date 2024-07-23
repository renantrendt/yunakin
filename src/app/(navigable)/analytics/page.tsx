import React from 'react'
import _ from 'lodash'
import AnalyticsPageContainer from '@/components/analytics/AnalyticsPageContainer'
import { fetchAnalyticsData } from '@/app/actions'
export default async function Dashboard() {


    const analyticsData = await fetchAnalyticsData();
    // check if no clicks yet
    const { cardStats, chartStats, partnerCardStats, partnerChartStats, partnerChartNumberStats, chartNumberStats } = analyticsData;
    let hasData = false
    _.keys(cardStats).forEach(key => {
        if (cardStats[key as keyof typeof cardStats] > 0) {
            hasData = true
        }

    })
    if (!hasData) {
        _.keys(partnerCardStats).forEach(key => {
            if (partnerCardStats[key as keyof typeof partnerCardStats] > 0) {
                hasData = true
            }
        })
    }

    if (!hasData) {
        _.keys(chartStats).forEach(key => {
            if (chartStats[key as keyof typeof chartStats].length > 0) {
                hasData = true
            }
        })
    }
    if (!hasData) {
        _.keys(partnerChartStats).forEach(key => {
            if (partnerChartStats[key as keyof typeof partnerChartStats].length > 0) {
                hasData = true
            }
        })
    }
    if (!hasData) {
        _.keys(partnerChartNumberStats).forEach(key => {
            if (partnerChartNumberStats[key as keyof typeof partnerChartNumberStats] > 0) {
                hasData = true
            }
        })
    }
    if (!hasData) {
        _.keys(chartNumberStats).forEach(key => {
            if (chartNumberStats[key as keyof typeof chartNumberStats] > 0) {
                hasData = true
            }
        })
    }

    // if no data randomize the values for the demo
    if (!hasData) {
        console.log('randomizing')
        // randomize the values
        _.keys(cardStats).forEach(key => {
            cardStats[key as keyof typeof cardStats] = Math.floor(Math.random() * 100)
        })
        _.keys(chartStats).forEach((key, index) => {
            chartStats[key as keyof typeof chartStats] = _.times(5, () => {
                return {
                    title: `Deal ${Math.floor(Math.random() * 5 + 1)}`,
                    count: Math.floor(Math.random() * 100)
                }
            })
        })
        _.keys(partnerCardStats).forEach((key) => {
            partnerCardStats[key as keyof typeof partnerCardStats] = Math.floor(Math.random() * 100)
        })
        _.keys(partnerChartStats).forEach((key, index) => {
            partnerChartStats[key as keyof typeof partnerChartStats] = _.times(5, () => {
                return {
                    title: `Partner ${Math.floor(Math.random() * 5 + 1)}`,
                    count: Math.floor(Math.random() * 100)
                }
            })
        })
        _.keys(partnerChartNumberStats).forEach((key) => {
            partnerChartNumberStats[key as keyof typeof partnerChartNumberStats] = Math.floor(Math.random() * 100)
        })
        _.keys(chartNumberStats).forEach((key) => {
            chartNumberStats[key as keyof typeof chartNumberStats] = Math.floor(Math.random() * 100)
        })
    }


    return (
        <AnalyticsPageContainer
            hasData={hasData}
            analyticsData={
                analyticsData
            }
        />
    )
}
