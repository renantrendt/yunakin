import { getChat, getChats } from '@/app/actions'
import siteUrls from '@/config/site-config'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import React from 'react'


export default async function AiPage() {
    const session = await getServerSession()

    if (!session?.user) {
        redirect(siteUrls.login)
    }


    const chats = await getChats(session.user.id)


    return <Chats chats={chats} />
}
