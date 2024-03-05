'use client'
import { Chat } from '@prisma/client'
import React from 'react'
import InputField from '../atomic/input/InputField'
import { useMutation } from '@tanstack/react-query'
import customToast from '../atomic/toast/customToast'
import { useRouter } from 'next/navigation'

interface ChatsProps {
    chats: Chat[]
}
const Chats = ({ chats }: ChatsProps) => {
    const [chatTitle, setChatTitle] = React.useState('')
    const router = useRouter()
    const addChatMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/chat/new', {
                method: 'POST',
                body: JSON.stringify({ chatTitle }),
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            })
            if (!response.ok) {
                if (response.status === 400 || response.status === 429) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
            }
            return response.json()
        },
        onSuccess: (data) => {
            router.push(`/chat/${data.id}`)
            customToast.success("Email successfully subscribed")
        },
        onError: (error) => {
            customToast.error(error.message)
        }
    })
    const createChat = async () => {
        await addChatMutation.mutateAsync()
    }
    return (
        <div>
            <div>

                {chats.map((chat) => (
                    <div className='chat card' key={chat.id} onClick={() => { router.push(`/chat/${chat.id}`) }}>
                        <div className='card-body'>
                            <h1>{chat.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className='form flex '>
                <InputField id='chat-title' name='chat-title' onChange={(e) => { setChatTitle(e.target.value) }} value={chatTitle} />
                <button className='btn' onClick={createChat}>Create Chat</button>
            </div>
        </div>
    )
}

export default Chats