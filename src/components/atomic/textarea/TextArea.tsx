import React from 'react'
interface TextAreaProps {
    label: string
    name: string
    id: string
    placeholder?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error?: string
    additionalProps?: any
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, placeholder, onChange, error, id, ...additionalProps }) => {
    return (
        <label className="form-control">
            {label &&
                <label className="label text-sm text-black dark:text-white">
                    <span className="label-text">{label}</span>
                </label>
            }
            <textarea className="
            outline-none bg-white text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border-[1px] border-solid
            border-grey-300 hover:border-grey-400 
             disabled:bg-grey-100 text-sm
             dark:bg-input-dark
             dark:border-input-border-dark
             dark:text-grey-200
             dark:placeholder:text-placeholder-dark
            shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out"
                placeholder={placeholder}
                name={name}
                id={id}
                onChange={onChange}
                rows={4}
                {...additionalProps}></textarea>
            {error && <p className='text-red-300'>{error}</p>}
        </label>
    )
}

export default TextArea