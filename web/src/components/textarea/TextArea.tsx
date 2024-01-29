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
            <div className="label">
                <span className="label-text">{label}</span>
                <span className="label-text-alt">{label}</span>
            </div>
            <textarea className="textarea dark:bg-gray-800 text-black dark:text-white textarea-bordered h-24"
                placeholder={placeholder}
                name={name}
                id={id}
                onChange={onChange}
                {...additionalProps}></textarea>
            {error && <p className='text-red-300'>{error}</p>}
        </label>
    )
}

export default TextArea