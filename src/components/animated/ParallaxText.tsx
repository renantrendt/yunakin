import { useRef } from "react";
import {
    motion,
    useTransform,
    useMotionValue,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import React from 'react'

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);

    const x = useTransform(baseX, (v) => `${wrap(-25, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        moveBy += directionFactor.current * moveBy;
        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div className="  overflow-hidden w-full leading-[0.8] whitespace-nowrap flex flex-nowrap">
            <motion.div className="flex gap-16 flex-nowrap" style={{ x }}>
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export default ParallaxText;