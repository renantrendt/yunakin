import React from 'react'
import FaqItem from './FaqItem'

const faqItems = [
    {
        question: 'What is the difference between a single and a double room?',
        answer: 'A single room is a room for one person. A double room is a room for two people. A double room can have either one double bed or two single beds.'
    },
    {
        question: "What is the difference between a single and a double room?",
        answer: "A single room is a room for one person. A double room is a room for two people. A double room can have either one double bed or two single beds."
    }
]
const FAQ = () => {
    const [showAnswer, setShowAnswer] = React.useState<number | null>(null)
    return (
        <div className='container px-4 flex flex-col md:flex-row justify-around items-center md:items-start  w-full m-auto py-16 h-[50vh]'>
            <div className='text flex flex-1 flex-col justify-center items-center md:items-start md:justify-start h-full mb-8 md:mb-0 '>
                <h5 className='text-primary'>FAQ</h5>
                <h1 className='font-bold text-3xl text-center md:text-left  md:text-4xl'>Frequently Asked Questions</h1>
            </div>
            <div className='faq-list flex-1 flex flex-col gap-8  max-w-md md:max-w-full  '>
                {faqItems.map((item, index) => (
                    <FaqItem key={index} question={item.question} answer={item.answer} isOpen={index == showAnswer} onClick={() => setShowAnswer(index == showAnswer ? null : index)} />
                ))}
            </div>
        </div>
    )
}

export default FAQ