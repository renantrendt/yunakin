import React from 'react'
import ExclamationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    name: string
    id: string
    placeholder?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error?: string
    additionalProps?: any
    showCounter?: boolean
    description?: string
    required?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, placeholder, onChange, required, description, error, id, showCounter, ...additionalProps }) => {
    return (
        <div className="form-control">
            <div className='flex flex-col gap-2  '>
                {label &&
                    <label className={cn(" text-sm text-black dark:text-white",
                        { "after:content-['*'] after:text-red-700 after:pl-1": required }
                    )}>
                        <span className="label-text">{label}</span>
                    </label>
                }
                {description && <p className='text-sm font-satoshi font-regular  text-[#5E5E5E] pb-2 '>{description}</p>}
            </div>

            <textarea className={cn(`
            outline-none bg-white text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border border-solid
            border-grey-300 hover:border-grey-400 
             disabled:bg-grey-100 text-sm
             dark:bg-input-dark
             dark:border-input-border-dark
             dark:text-grey-200
             dark:placeholder:text-placeholder-dark
            shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out`,
                { "!border-red-500": error },
                additionalProps.className)}
                placeholder={placeholder}
                name={name}
                id={id}
                maxLength={additionalProps.maxLength}
                onChange={onChange}
                rows={4}
                {...additionalProps}></textarea>
            {!error && additionalProps.maxLength && showCounter && <p className='text-sm text-gray-400 text-right'> {`${additionalProps.value?.length}/${additionalProps.maxLength}`} </p>}
            {error &&
                <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
                    <ExclamationIcon />
                    <p className='text-sm leading-5'>{error}</p>
                </div>}
        </div>
    )
}

export default TextArea