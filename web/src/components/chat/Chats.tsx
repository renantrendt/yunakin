'use client'
import { Chat } from '@prisma/client'
import React from 'react'

interface ChatsProps {
    chats: Chat[]
}
const Chats = ({ chats }: ChatsProps) => {
    return (
        <div>
            <div>

                {chats.map((chat) => (
                    <div className='chat card' onClick={() => { }}>
                        <h1>{chat.title}</h1>
                    </div>
                ))}
            </div>
            <div>
                <button className='btn'>Create Chat</button>
            </div>
        </div>
    )
}

export default Chats