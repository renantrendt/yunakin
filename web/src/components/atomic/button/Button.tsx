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
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', disabled, label, onClick, type, classname, size, loading }) => {
  const baseStyle = 'btn '
  const variantStyle = variant === 'primary' ? 'btn-primary text-white' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline text-primary'
  const sizeStyle = size === 'small' ? 'btn-sm' : size === 'large' ? 'btn-lg' : 'btn-md'
  return (
    <button disabled={disabled || loading} className={`${baseStyle} ${variantStyle} ${classname} ${sizeStyle}`} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null}  {label}
    </button>
  )
}

export default Button
