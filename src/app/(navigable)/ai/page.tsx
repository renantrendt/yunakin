import { getChats } from '@/app/actions'
import { auth } from '@/auth'
import Chats from '@/components/chat/Chats'
import siteUrls from '@/config/site-config'
import { redirect } from 'next/navigation'
import React from 'react'


export default async function AiPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(siteUrls.general.login)
    }

    console.log('session', session)
    const chats = await getChats(session.user.id)


    return <Chats chats={chats} />
}
