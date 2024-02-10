import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface AnimatedSectionProps {
    children: React.ReactNode
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
    const ref = useRef(null)
    const variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'linear'
            }
        },
        hidden: {
            opacity: 0,
            y: 100,
        }
    };
    const controls = useAnimation();
    const inView = useInView(ref);
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedSection