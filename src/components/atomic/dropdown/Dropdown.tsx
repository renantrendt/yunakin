'use client'
import React from 'react'
import ExclamationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn';

interface DropdownOption {
    value: string;
    label: string;
}
interface DropdownProps {
    className?: string;
    options: DropdownOption[];
    onChange?: (value: string) => void;
    error?: string;
    label?: string;
    id: string;
    name: string;
    value: string;

}
const Dropdown = ({ onChange, options, error, label, id, name, className, value }: DropdownProps) => {
    return (
        <div>
            <div className='flex flex-col gap-2'>

                {label &&
                    <label className=" text-sm text-black dark:text-white mb-1">
                        <span className="label-text">{label}</span>
                    </label>
                }
            </div>

            <select id={id} name={name} onChange={(e) => { onChange && onChange(e.target.value) }}
                className={cn(` min-w-[100px] outline-none  
                text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-[10px] border border-solid
                border-grey-300 hover:border-grey-400 
                disabled:bg-grey-100 
                dark:bg-input-dark
                dark:border-input-border-dark
                dark:text-grey-200
                dark:placeholder:text-placeholder-dark
                text-sm
                shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out 
                         `, { "!border-red-500": error }, className)}
                value={value}
            >
                {options.map((option, index) => {
                    return (
                        <option key={index} selected={option.value == value} value={option.value}>{option.label}</option>
                    )
                })}
            </select>
            {error &&
                <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
                    <ExclamationIcon />
                    <p className='text-sm leading-5'>{error}</p>
                </div>
            }
        </div>

    )
}

export default Dropdown