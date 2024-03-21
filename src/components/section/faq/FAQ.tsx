import React from 'react'
import FaqItem from './FaqItem'
import AnimatedSection from '@/components/animated/AnimatedSection'
import Typography from '@/components/atomic/typography/Typography'
import { useTranslation } from '@/lib/i18n/client'
const FAQ = () => {
    const { t } = useTranslation('landing')
    const [showAnswer, setShowAnswer] = React.useState<number | null>(null)

    const faqs = t("faq.faqs", { returnObjects: true }) as { question: string, answer: string }[];
    return (
        <AnimatedSection>

            <div className='container  my-24 lg:my-32 flex flex-col justify-center items-center  w-full m-auto gap-4 lg:gap-20' >
                <div className='text flex  flex-col justify-center items-center mb-8 md:mb-0 text-black dark:text-white gap-5  '>
                    <Typography type='h1' className=''>{t("faq.title")}</Typography>
                    <Typography type='h6' className='dark:text-sidebar-icon-dark'>{t("faq.description")}</Typography>
                </div>
                <div className='faq-list flex flex-col justify-start gap-2  max-w-xl w-full   '>
                    {faqs.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} isOpen={index == showAnswer} onClick={() => setShowAnswer(index == showAnswer ? null : index)} />

                    ))}
                </div>
            </div>
        </AnimatedSection>

    )
}

export default FAQ