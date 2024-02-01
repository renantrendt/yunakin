// components/Button.tsx
import LoadingIcon from '@/assets/icons/LoadingIcon'
import React from 'react'


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  label: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  size?: 'small' | 'medium' | 'large'
  classname?: string
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ icon = null, variant = 'primary', disabled, label, onClick, type, classname, size, loading }) => {
  const baseStyle = 'btn '
  const variantStyle = variant === 'primary' ? 'btn-primary text-white' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline hover:text-black text-primary'
  const sizeStyle = size === 'small' ? 'btn-sm' : size === 'large' ? 'btn-lg' : 'btn-md'
  return (
    <button disabled={disabled || loading} className={`${baseStyle} ${variantStyle} ${classname} ${sizeStyle}`} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null} {icon} {label}
    </button>
  )
}

export default Button
