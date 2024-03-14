import { getChats } from '@/app/actions'
import Chats from '@/components/chat/Chats'
import siteUrls from '@/config/site-config'
import { authOptions } from '@/lib/auth/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'


export default async function AiPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect(siteUrls.general.login)
    }

    console.log('session', session)
    const chats = await getChats(session.user.id)


    return <Chats chats={chats} />
}
