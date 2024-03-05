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

const Button: React.FC<ButtonProps> = ({ icon = null, variant = 'primary', disabled, label, onClick, type, classname, size = "md", loading, trailing }) => {
  const baseStyle = 'btn button'
  let variantStyle = ''
  switch (variant) {
    case 'primary':
      variantStyle = 'btn-primary hover:bg-primary-600 text-white bg-primary-500  rounded-lg shadow'
      break
    case 'secondary':
      variantStyle = ' button-secondary  hover:border-none hover:outline-none text-black bg-white rounded-lg py-[14px] px-5  '
      break
    case 'tertiary':
      variantStyle = ' bg-grey-200 rounded-lg  text-black border-none  '
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
    <button disabled={disabled || loading} className={cn(baseStyle, variantStyle, classname, sizeStyle)} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null} {trailing ? <><span className='mr-2'>{label}</span> {icon} </> : <>{icon} <span className='ml-2'> {label} </span></>}
    </button>
  )
}

export default Button
