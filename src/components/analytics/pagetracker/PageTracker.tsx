"use client"
import { upsertMemberPageView } from '@/app/actions'
import { MemberBenefitPageConfig } from '@prisma/client'
import DeviceDetector from 'device-detector-js'
import React, { useEffect } from 'react'

interface PageTrackerProps {
    config: MemberBenefitPageConfig
}
const PageTracker = ({ config }: PageTrackerProps) => {
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
        })();
    }, [])
    return (
        <br id='tracker' />
    )
}

export default PageTracker