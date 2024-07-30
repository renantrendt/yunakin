// components/InputField.tsx
import React from 'react'
import ExclmationIcon from '@/icons/exclamation-circle.svg'
import { cn } from '@/utils/cn'
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  id: string
  placeholder?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  additionalProps?: any
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  customLeadingIconClassName?: string
  required?: boolean
  description?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', leadingIcon, trailingIcon, placeholder, onChange, description, className, required, error, id, ...additionalProps }) => {
  return (
    <div className="form-control  w-full font-satoshi">
      <div className='flex justify-between flex-col gap-2  '>

        {label &&
          <label className={cn(" text-sm font-medium w-fit text-black dark:text-white ", {
            "after:content-['*'] after:text-red-700 after:pl-1": required
          })}>
            <span className=" label-text">{label}</span>
          </label>
        }
        {description && <p className='text-sm font-satoshi font-regular  text-[#5E5E5E] pb-2'>{description}</p>}
      </div>
      <div className='flex relative'>
        {leadingIcon && <div className={cn('absolute left-[16px] top-[11px] text-black dark:text-placeholder-dark ', additionalProps.customLeadingIconClassName)}>{leadingIcon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(` outline-none font-satoshi  dark:bg-gray-800 text-black placeholder:text-grey-400 rounded-lg w-full px-4 py-3 border border-solid
                    border-grey-300 hover:border-grey-400 
                    dark:border-input-border-dark dark:text-grey-200
                    dark:placeholder:text-placeholder-dark
                    disabled:bg-grey-100 text-sm
                    shadow-sm focus:border-primary-500 focus:shadow-focus-primary  duration-150 ease-in-out`,
            { "pl-11": !!leadingIcon },
            { "pr-11": !!trailingIcon },
            { "!border-red-500 ": error },
            className)}
          name={name}
          id={id}
          onChange={onChange}
          {...additionalProps}
        />
        {trailingIcon && <div className='absolute right-4 top-[15px]  text-black dark:text-placeholder-dark'>{trailingIcon}</div>}
      </div>
      {!error && additionalProps.maxLength && <p className='text-sm  right-10  text-gray-400 leading-none  pt-2 text-right'> {`${additionalProps.value?.length}/${additionalProps.maxLength}`} </p>}
      {!error && !additionalProps.maxLength && <p className='text-sm  '>&nbsp;</p>}
      {error &&
        <div className='flex justify-start gap-2 text-red-600 items-center mt-2'>
          <ExclmationIcon />
          <p className='text-sm leading-5'>{error}</p>
        </div>}
    </div>
  )
}

export default InputField
