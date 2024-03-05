import React from 'react'
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import Chat from '@/components/chat/Chat'
import { getServerSession } from 'next-auth'
import { getChat } from '@/app/actions'
import { Message } from 'ai'

export interface ChatPageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({
    params
}: ChatPageProps): Promise<Metadata> {
    const session = await getServerSession()

    if (!session?.user) {
        return {}
    }

    const chat = await getChat(params.id, session.user.id)
    return {
        title: chat?.title.toString().slice(0, 50) ?? 'Chat'
    }
}

export default async function ChatPage({ params }: ChatPageProps) {
    const session = await getServerSession()

    if (!session?.user) {
        redirect(`/sign-in?next=/chat/${params.id}`)
    }

    const chat = await getChat(params.id, session.user.id)

    if (!chat) {
        notFound()
    }

    if (chat?.userId !== session?.user?.id) {
        notFound()
    }
    const mappedMessages = chat.messages.map((message) => {
        const serializedMessage = JSON.parse(message.serialized) as Message;
        return serializedMessage;
    })
    return <Chat id={chat.id} initialMessages={mappedMessages} />
}