import { cn } from '@/utils/cn'
import React from 'react'

interface ToggleProps {
    label?: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
}

const Toggle = ({ label, checked, onChange, disabled }: ToggleProps) => {
    return (
        <label className="inline-flex items-center cursor-pointer gap-2">
            {label && <span className={cn(" text-xs  text-right lg:text-sm font-medium text-gray-900 dark:text-gray-300", { "text-gray-400": disabled })}>{label}</span>}
            <input disabled={disabled} type="checkbox" checked={checked} onChange={(e) => {
                onChange(e.target.checked)
            }} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-grey-200 peer-focus:outline-none 
            peer-focus:ring-4 peer-focus:ring-prmary-500 
             rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-landing-background 
              after:content-[''] after:absolute  after:top-[2px] after:start-[2px] after:bg-landing-background after:border-gray-300 
              after:border  after:rounded-full after:h-5 after:w-5 
              peer-disabled:bg-gray-200
              after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
        </label>
    )
}

export default Toggle