import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import { motion, AnimatePresence } from 'framer-motion';

import React from 'react'

interface FaqItemProps {
    question: string
    answer: string
    isOpen?: boolean
    onClick?: () => void
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
    return (
        <div className='container border-t-[1px]  border-b-black w-full'>
            <motion.div
                initial={false}
                animate={{
                    // backgroundColor: showAnswer ? "white" : "gray",
                }}
                onClick={onClick}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <h3 className='word-break'>{question}</h3>
                {isOpen ? <div ><MinusIcon /> </div> : <div><PlusIcon /></div>}
            </motion.div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        // Add animations for the accordion content
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "initial" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4 }}

                    >
                        <div className='pt-4'>
                            {answer}

                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>

    )
}

export default FaqItem