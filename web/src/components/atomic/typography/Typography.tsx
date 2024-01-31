import React from 'react'

interface TypographyProps {
    className?: string;
    type: TypographyType
    children: string;
}
type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"

const Typography = ({ type, children, className }: TypographyProps) => {
    const baseClasses = `font-normal  ${className} `;
    switch (type) {
        case "h1":
            return <h1 className={`${baseClasses} text-7xl `}>{children}</h1>
        case "h2":
            return <h2 className={`${baseClasses} text-6xl`}>{children}</h2>
        case "h3":
            return <h3 className={`${baseClasses} text-5xl`}>{children}</h3>
        case "h4":
            return <h4 className={`${baseClasses} text-4xl`}>{children}</h4>
        case "h5":
            return <h5 className={`${baseClasses} text-3xl`}>{children}</h5>
        case "h6":
            return <h6 className={`${baseClasses} text-2xl`}>{children}</h6>
        case "p":
            return <p className={`${baseClasses} text-xl`}>{children}</p>
        default:
            return <p className={`${baseClasses} text-lg`}>{children}</p>
    }
}

export default Typography;