// components/InputField.tsx
import React from 'react'
import ExclmationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn'
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
  customLeadingIconClassName?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', leadingIcon, trailingIcon, placeholder, onChange, error, id, ...additionalProps }) => {
  return (
    <div className="form-control ">
      {label &&
        <label className="label text-sm text-black dark:text-white">
          <span className="label-text">{label}</span>
        </label>
      }
      <div className='flex relative'>
        {leadingIcon && <div className={cn('absolute left-[16px] top-[11px] text-black ', additionalProps.customLeadingIconClassName)}>{leadingIcon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className={` outline-none  dark:bg-gray-800 text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border-[1px] border-solid
           border-grey-300 hover:border-grey-400 
            disabled:bg-grey-100 text-sm
           shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out ${leadingIcon ? "pl-11" : ""} 
           ${trailingIcon ? "pr-11" : ""}
            ${error ? "border-red-500" : ""}
           ${additionalProps.customClassName}`}
          name={name}
          id={id}
          onChange={onChange}
          {...additionalProps}
        />
        {trailingIcon && <div className='absolute right-4 top-[12px]  text-black dark:text-white'>{trailingIcon}</div>}
      </div>

      {error &&
        <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
          <ExclmationIcon />
          <p className='text-sm leading-5'>{error}</p>
        </div>}
    </div>
  )
}

export default InputField
