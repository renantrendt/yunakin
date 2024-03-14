import React from 'react'
import FaqItem from './FaqItem'
import AnimatedSection from '@/components/animated/AnimatedSection'
import { siteCopy } from '@/config/site-config'
import Typography from '@/components/atomic/typography/Typography'
const FAQ = () => {
    const [showAnswer, setShowAnswer] = React.useState<number | null>(null)
    return (
        <AnimatedSection>

            <div className='container  my-24 lg:my-32 flex flex-col justify-center items-center  w-full m-auto gap-4 lg:gap-20' >
                <div className='text flex  flex-col justify-center items-center mb-8 md:mb-0 text-black dark:text-white gap-5  '>
                    <Typography type='h1' className=''>{siteCopy.faqSection.title}</Typography>
                    <Typography type='h6' className='dark:text-sidebar-icon-dark'>{siteCopy.faqSection.description}</Typography>
                </div>
                <div className='faq-list flex flex-col justify-start gap-2  max-w-2xl w-full   '>
                    {siteCopy.faqSection.faqs.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} isOpen={index == showAnswer} onClick={() => setShowAnswer(index == showAnswer ? null : index)} />

                    ))}
                </div>
            </div>
        </AnimatedSection>

    )
}

export default FAQ