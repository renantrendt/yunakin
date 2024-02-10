// components/Button.tsx
import LoadingIcon from '@/assets/icons/LoadingIcon'
import { cn } from '@/utils/cn'
import React from 'react'


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  label: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  size?: 'lg' | 'md' | 'sm' | 'xs'
  classname?: string
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ icon = null, variant = 'primary', disabled, label, onClick, type, classname, size = "md", loading }) => {
  const baseStyle = 'btn '
  const variantStyle = variant === 'primary' ? 'btn-primary text-white from-primary to-secondary' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline hover:text-black text-primary'
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
      {loading ? <LoadingIcon /> : null} {icon} {label}
    </button>
  )
}

export default Button
