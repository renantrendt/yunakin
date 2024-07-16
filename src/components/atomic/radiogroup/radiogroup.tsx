'use client'
import React from 'react'
import ExclamationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn';
import ExclmationIcon from '@/icons/exclamation-circle.svg'

interface RadioGroupOption {
    value: string;
    label: string | React.ReactNode;
}
interface RadioGroupProps {
    className?: string;
    options: RadioGroupOption[];
    onChange?: (value: string) => void;
    error?: string;
    label?: string;
    id: string;
    name: string;
    value: string;

}
const RadioGroup = ({ onChange, options, error, label, id, name, className, value }: RadioGroupProps) => {
    return (
        <div>
            <div className='flex flex-col gap-[14px]'>

                {options.map((option, index) => {
                    return (
                        <div key={index} className='flex items-center gap-2 cursor-pointer justify-start'>
                            <input type='radio' id={option.value} name={name}
                                className={cn("  text-primary-500  rounded-full hover:cursor-pointer duration-150 ease-in-out  shadow-sm  focus:ring-0 focus:ring-offset-0  !outline-none  border border-grey-300 dark:bg-input-dark dark:border-input-border-dark", className)}
                                value={option.value} onChange={(e) => { onChange && onChange(e.target.value) }}
                                checked={option.value == value} />
                            <label className={"cursor-pointer"} htmlFor={option.value}>{option.label}</label>
                        </div>
                    )
                })}
            </div>
            {error &&
                <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
                    <ExclmationIcon />
                    <p className='text-sm leading-5'>{error}</p>
                </div>
            }
        </div>

    )
}

export default RadioGroup