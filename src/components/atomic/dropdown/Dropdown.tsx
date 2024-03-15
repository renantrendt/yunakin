'use client'
import React from 'react'

interface DropdownOption {
    value: string;
    label: string;
    selected?: boolean;
}
interface DropdownProps {
    className?: string;
    options: DropdownOption[];
    onChange?: (value: string) => void;
    error?: string;
    label?: string;
    id: string;
    name: string;

}
const Dropdown = ({ onChange, options, error, label, id, name }: DropdownProps) => {
    return (
        <div>
            {label &&
                <label className="label text-sm text-black dark:text-white">
                    <span className="label-text">{label}</span>
                </label>
            }
            <select id={id} name={name} onChange={(e) => { onChange && onChange(e.target.value) }} className={` min-w-[100px] outline-none  dark:bg-gray-800 text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-[10px] border-[1px] border-solid
        border-grey-300 hover:border-grey-400 
         disabled:bg-grey-100 text-sm
         dark:bg-input-dark
         dark:border-input-border-dark
         dark:text-grey-200
         dark:placeholder:text-placeholder-dark
        shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out 
         ${error ? "border-red-500" : ""}
     `}>
                {options.map((option, index) => {
                    return (
                        <option key={index} selected={option.selected} value={option.value}>{option.label}</option>
                    )
                })}
            </select>
        </div>

    )
}

export default Dropdown