// components/Button.tsx
import LoadingIcon from '@/assets/icons/LoadingIcon'
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
  const baseStyle = 'btn'
  let variantStyle = ''
  switch (variant) {
    case 'primary':
      variantStyle = 'btn-primary text-white  bg-gradient-to-b from-primary to-secondary'
      break
    case 'secondary':
      variantStyle = 'border border-zinc-300 text-black bg-white rounded-lg shadow '
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
      {loading ? <LoadingIcon /> : null} {trailing ? <>{label} {icon} </> : <>{icon} {label}</>}
    </button>
  )
}

export default Button
