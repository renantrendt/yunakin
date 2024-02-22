// components/InputField.tsx
import React from 'react'

interface InputFieldProps {
  label?: string
  name: string
  id: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  additionalProps?: any
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  customClassName?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', leadingIcon, trailingIcon, placeholder, onChange, error, id, ...additionalProps }) => {
  return (
    <div className="form-control ">
      {label &&
        <label className="label text-black dark:text-white">
          <span className="label-text">{label}</span>
        </label>
      }
      <div className='flex relative'>
        {leadingIcon && <div className='absolute left-[8px] top-3 text-black dark:text-white '>{leadingIcon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className={`input  input-primary dark:bg-gray-800 text-black dark:text-white  w-full ${leadingIcon ? "pl-9" : ""} ${additionalProps.customClassName}`}
          name={name}
          id={id}
          onChange={onChange}
          {...additionalProps}
        />
        {trailingIcon && <div className='absolute right-[8px] top-3  text-black dark:text-white'>{trailingIcon}</div>}
      </div>

      {error && <p className='text-red-600 mt-1 pl-1'>{error}</p>}
    </div>
  )
}

export default InputField
