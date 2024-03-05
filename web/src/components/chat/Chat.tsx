'use client'
import React from 'react'
import { useChat } from 'ai/react'


import { useLocalStorage } from '@/hooks/useLocalStorage'

import { usePathname } from 'next/navigation'
import customToast from '../atomic/toast/customToast'
import { Message } from 'ai'
import UserIcon from '@/icons/user-icon.svg'
import ChatGptIcon from '@/icons/chatgpt.svg'
export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

function Chat({ id, initialMessages }: ChatProps) {
    const path = usePathname()
    const [previewToken,] = useLocalStorage<string | null>(
        'ai-token',
        null
    )
    const { messages, input, handleSubmit, handleInputChange } =
        useChat({
            initialMessages,
            id,
            body: {
                id,
                previewToken
            },
            onResponse(response) {
                if (response.status === 401) {
                    customToast.error(response.statusText)
                }
            },
            onFinish() {
                if (!path.includes('chat')) {
                    window.history.pushState({}, '', `/chat/${id}`)
                }
            }
        })
    return (
        <>
            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                {messages.map(m => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        {m.role === 'user' ? <UserIcon /> : <ChatGptIcon />}
                        {m.content}
                    </div>
                ))}

                <form onSubmit={handleSubmit}>
                    <input
                        className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                </form>
            </div>
        </>
    )
}
export default Chat;