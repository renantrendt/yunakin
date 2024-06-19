import React from 'react'
import { notFound, redirect } from 'next/navigation'

import Chat from '@/components/chat/Chat'
import { getChat } from '@/app/actions'
import { Message } from 'ai'
import { authOptions } from '@/lib/auth/authOptions'
import { auth } from '@/auth'

export interface ChatPageProps {
    params: {
        id: string
    }
}


export default async function ChatPage({ params }: ChatPageProps) {
    const session = await auth()
    if (!session?.user) {
        redirect(`/sign-in?next=/chat/${params.id}`)
    }

    const chat = await getChat(params.id, session.user.id)
    console.log(params.id, chat?.id)
    if (chat?.userId !== session?.user?.id) {
        notFound()
    }
    if (!chat) {
        notFound()
    }
    const mappedMessages = chat.messages.map((message) => {
        const serializedMessage = {
            content: message.content,
            role: message.role,
        } as Message;
        return serializedMessage;
    })
    return <Chat id={chat.id} initialMessages={mappedMessages} />
}