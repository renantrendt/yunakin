"use client";
import { useEffect, useRef, useState } from "react";

const useDebounce = (value: any, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState("");
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
