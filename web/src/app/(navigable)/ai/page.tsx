'use client';
import InputField from '@/components/atomic/input/InputField'
import { Button } from '@react-email/components';
import React, { useEffect } from 'react'

const AiPage = () => {
    const [prompt, setPrompt] = React.useState('')
    const [chatList, setChatList] = React.useState([])
    useEffect(() => {
        console.log('chatList', chatList)


    }, []);
    return (
        <div>
            <h1>AI Page</h1>



            <div>
                <InputField
                    id='prompt'
                    name='prompt'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Enter your prompt'
                    customClassName='w-full'

                />
                <Button onClick={() => console.log('clicked')} className='w-full mt-4'>Generate</Button>
            </div>

        </div>
    )
}

export default AiPage