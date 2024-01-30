import React from 'react'

interface TypographyProps {
    title: string;
    description: string;
    image?: string;
    direction?: "ltr" | "rtl" | string
    type: TypographyType
}
type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"

const Typography = ({ type }: TypographyProps) => {
    return (
        <div>Heading</div>
    )
}

export default Typography;