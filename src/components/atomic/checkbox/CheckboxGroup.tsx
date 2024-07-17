'use client'
import React from 'react'
import ExclamationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn';
import ExclmationIcon from '@/icons/exclamation-circle.svg'
import Checkbox from './Checkbox';

interface CheckboxGroupOption {
    value: string;
    label: string | React.ReactNode;
}
interface CheckboxGroupProps {
    className?: string;
    options: CheckboxGroupOption[];
    onChange?: (value: string[]) => void;
    error?: string;
    label?: string;
    id: string;
    name: string;
    value: string[] | null | undefined;

}
const CheckboxGroup = ({ onChange, options, error, name, className, value }: CheckboxGroupProps) => {
    const [selected, setSelected] = React.useState(value || [])
    return (
        <div>
            <div className='flex flex-col gap-[14px]'>

                {options.map((option, index) => {
                    return (
                        <div key={index} className={cn('flex items-center gap-2 cursor-pointer justify-start', className)}>
                            <Checkbox
                                label={option.label}
                                name={option.value}
                                required={false}
                                id={option.value}
                                onChange={(e) => {
                                    const isChecked = e.target.checked
                                    let currSelections = selected
                                    if (isChecked) {
                                        currSelections.push(option.value);
                                    } else {
                                        currSelections = currSelections.filter((v) => v !== option.value);
                                    }
                                    currSelections = [...new Set(currSelections)]
                                    setSelected(currSelections);
                                    onChange && onChange(currSelections)
                                }}
                                checked={selected.includes(option.value) || false}
                            />
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

export default CheckboxGroup