import React from 'react'
import Typography from '@/components/atomic/typography/Typography'
import { createTranslation } from '@/lib/i18n/server'
import EnvelopeIcon from "@/icons/envelop-icon.svg"

const MagicLinkSentPage = async () => {

    const { t } = await createTranslation('auth')
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 bg-white dark:bg-black py-48">
            <div className="flex flex-col">
                <div className="flex flex-col items-center gap-12">
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='dark:text-white  '>
                            <EnvelopeIcon />
                        </div>
                        <Typography type='p' className='text-neutral-600 text-base leading-[26px] max-w-[400px] text-center dark:text-profile-modal-text-dark' >{t("magicLink.sent")}</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicLinkSentPage