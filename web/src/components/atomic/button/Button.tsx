// components/Button.tsx
import LoadingIcon from '@/icons/LoadingIcon'
import { cn } from '@/utils/cn'
import React from 'react'


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'sucesss' | 'clear'
  label?: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  size?: 'lg' | 'md' | 'sm' | 'xs'
  classname?: string
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  trailing?: boolean
}

const Button: React.FC<ButtonProps> = ({ icon = null, variant = 'primary', disabled, label, onClick, type, classname, size = "lg", loading, trailing }) => {
  const baseStyle = " min-w-fit cursor-pointer rounded-lg flex justify-center items-center gap-2 duration-150 ease-in-out  text-[14px] font-normal leading-[20px]  "
  let variantStyle = ''
  switch (variant) {
    case 'primary':
      variantStyle = ' hover:bg-primary-600 text-white bg-primary-500 focus:shadow-focus-primary  disabled:bg-disabled   '
      break
    case 'secondary':
      variantStyle = 'border-[1px] bg-white border-grey-300 shadow-sm hover:bg-grey-200 focus:shadow-focus-primary  text-black bg-white disabled:bg-disabled  dark:bg-input-dark dark:text-white dark:border-input-border-dark '
      break
    case 'tertiary':
      variantStyle = ' bg-grey-200  text-black border-none hover:bg-grey-300 focus:shadow-focus-primary  disabled:bg-grey-200 '
      break
    case 'alert':
      variantStyle = 'bg-red-500 text-white  hover:bg-red-600 focus:shadow-focus-red disabled:bg-red-200'
      break
    case 'sucesss':
      variantStyle = 'bg-green-500 text-white hover:bg-green-600 focus:shadow-focus-green disabled:bg-green-200'
      break
    case 'clear':
      variantStyle = 'text-black hover:bg-grey-200 focus:bg-focus-primary  disabled:text-grey-400'
      break
  }

  let sizeStyle = ''
  switch (size) {
    case 'lg':
      sizeStyle = 'py-[14px] px-5'
      break
    case 'md':
      sizeStyle = 'py-[10px] px-4'
      break
    case 'sm':
      sizeStyle = 'py-[6px] px-3'
      break
    case 'xs':
      sizeStyle = 'py-[2px] px-2'
      break
  }
  return (
    <button disabled={disabled || loading} className={cn(baseStyle, variantStyle, sizeStyle, classname)} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null} {trailing ? <>{label ? <span className='mr-0'>{label}</span> : null}  {icon} </> : <>{icon} {label && <span className='ml-0'> {label} </span>}</>}
    </button>
  )
}

export default Button
