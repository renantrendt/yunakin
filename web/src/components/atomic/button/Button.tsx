// components/Button.tsx
import LoadingIcon from '@/icons/LoadingIcon'
import { cn } from '@/utils/cn'
import React from 'react'


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'sucesss' | 'clear'
  label: string
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
  const baseStyle = "min-w-[150px] rounded-lg flex justify-center items-center gap-2 duration-150 ease-in-out  font-[14px] font-normal leading-[20px] "
  let variantStyle = ''
  switch (variant) {
    case 'primary':
      variantStyle = ' hover:bg-primary-600 text-white bg-primary-500 focus:shadow-focus-primary  disabled:bg-disabled   '
      break
    case 'secondary':
      variantStyle = 'border-[1px] bg-white border-grey-300 shadow-sm hover:bg-grey-200 focus:shadow-focus-primary  text-black bg-white disabled:bg-disabled '
      break
    case 'tertiary':
      variantStyle = ' bg-grey-200  text-black border-none hover:bg-grey-300 focus:shadow-focus-primary  disabled:bg-grey-200 '
      break
    case 'alert':
      variantStyle = 'btn-alert'
      break
    case 'sucesss':
      variantStyle = 'btn-sucesss'
      break
    case 'clear':
      variantStyle = 'btn-clear'
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
    <button disabled={disabled || loading} className={cn(baseStyle, variantStyle, classname, sizeStyle,)} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null} {trailing ? <><span className='mr-0'>{label}</span> {icon} </> : <>{icon} <span className='ml-0'> {label} </span></>}
    </button>
  )
}

export default Button
