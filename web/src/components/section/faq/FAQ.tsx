import React from 'react'
import FaqItem from './FaqItem'
import AnimatedSection from '@/components/animated/AnimatedSection'

const faqItems = [
    {
        question: 'What is the difference between a single and a double room?',
        answer: 'A single room is a room for one person. A double room is a room for two people. A double room can have either one double bed or two single beds.'
    },
    {
        question: "What is the difference between a single and a double room?",
        answer: "A single room is a room for one person. A double room is a room for two people. A double room can have either one double bed or two single beds."
    },
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
        <AnimatedSection>

            <div className='container   my-32 flex flex-col justify-center items-center  w-full m-auto gap-20' >
                <div className='text flex  flex-col justify-center items-center mb-8 md:mb-0 text-black dark:text-white  '>
                    <h1 className='text-5xl  font-bold mb-5'>FAQ</h1>
                    <h4 className='text-center text-xl '>Frequently Asked Questions</h4>
                </div>
                <div className='faq-list flex flex-col justify-start gap-5  max-w-2xl w-full   '>
                    {faqItems.map((item, index) => (
                        <FaqItem question={item.question} answer={item.answer} isOpen={index == showAnswer} onClick={() => setShowAnswer(index == showAnswer ? null : index)} />

                    ))}
                </div>
            </div>
        </AnimatedSection>

    )
}

export default FAQ