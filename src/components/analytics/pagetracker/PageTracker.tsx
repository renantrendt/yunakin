"use client"
import { upsertMemberPageView, upsertPartnerPageView } from '@/app/actions'
import { OtherMemberBenefitWithMemberBenefit } from '@/lib/types'
import { MemberBenefitPageConfig, OtherMemberBenefit } from '@prisma/client'
import DeviceDetector from 'device-detector-js'
import React, { useEffect } from 'react'

interface PageTrackerProps {
    config: MemberBenefitPageConfig
    otherBenefits: OtherMemberBenefitWithMemberBenefit[]
}
const PageTracker = ({ config, otherBenefits }: PageTrackerProps) => {
    const deviceDetector = new DeviceDetector()
    useEffect(() => {
        (async function () {
            const device = deviceDetector.parse(navigator.userAgent || window.navigator.userAgent)
            try {
                await upsertMemberPageView({
                    memberBenefitPageConfigId: config.id,
                    device: (device.device?.type as string),
                    browser: device.client?.name,
                    os: device.os?.name,
                });
            } catch (error) {
                // console.error(error)
            }
            try {
                const otherPageConfigIds = [...new Set(otherBenefits.map(benefit => benefit.memberBenefit.pageConfigId).filter(id => !!id))]
                console.log(otherPageConfigIds)
                await upsertPartnerPageView({
                    memberBenefitPageConfigId: config.id,
                    partnerPageConfigIds: otherPageConfigIds as string[],
                    device: (device.device?.type as string),
                    browser: device.client?.name,
                    os: device.os?.name,
                });

            } catch (error) {
                console.error(error)
            }
        })();
    }, [])
    return (
        <br id='tracker' />
    )
}

export default PageTracker