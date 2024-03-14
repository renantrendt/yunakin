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
            <div className="label text-sm text-black">
                <span className="label-text">{label}</span>
                <span className="label-text-alt">{label}</span>
            </div>
            <textarea className="
            outline-none bg-white text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border-[1px] border-solid
            border-grey-300 hover:border-grey-400 
             disabled:bg-grey-100 text-sm
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