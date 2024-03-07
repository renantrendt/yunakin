import React from 'react'

interface TypographyProps {
    className?: string;
    type: TypographyType
    children: string | React.ReactNode;
}
type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"

const Typography = ({ type, children, className, }: TypographyProps) => {
    const baseClasses = `text-black  ${className}`;
    switch (type) {
        case "h1":
            return <h1 className={`${baseClasses} text-stone-950 text-4xl  leading-[48px] lg:leading-[64px] lg:text-5xl font-semibold `}>{children}</h1>
        case "h2":
            return <h2 className={`${baseClasses} text-5xl font-black text-stone-950 lg:text-6xl leading-[64px]`}>{children}</h2>
        case "h3":
            return <h3 className={`${baseClasses} text-2xl leading-[32px] font-normal`}>{children}</h3>
        case "h4":
            return <h4 className={`${baseClasses} lg:text-2xl`}>{children}</h4>
        case "h5":
            return <h5 className={`${baseClasses} lg:text-3xl`}>{children}</h5>
        case "h6":
            return <h6 className={`${baseClasses} lg:text-xl lg:leading-[30px] `}>{children}</h6>
        case "p":
            return <p className={`${baseClasses} lg:text-base`}>{children}</p>
        default:
            return <p className={`${baseClasses} lg:text-lg`}>{children}</p>
    }
}

export default Typography;