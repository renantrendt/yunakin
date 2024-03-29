import React from 'react'
import { VariantProps, cva } from 'class-variance-authority';

const divider = cva("", {
    variants: {
        dividerType: {
            vertical: 'w-px h-full min-h-full',
            horizontal: 'w-full h-px'
        },
        dividerStyle: {
            light: 'bg-grey-200 dark:!bg-profile-modal-border-dark',
            heavy: 'bg-grey-300'
        }
    },
    defaultVariants: {
        dividerStyle: 'light'
    }
})

interface DividerProps extends React.HTMLProps<HTMLSpanElement>, VariantProps<typeof divider> {

}

const Divider = ({ dividerType, dividerStyle, ...aditionalProps }: DividerProps) => {

    return (
        <span className={divider({ dividerType, dividerStyle })} {...aditionalProps}>&nbsp;</span>
    )
}

export default Divider