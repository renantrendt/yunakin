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
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', label, onClick, type, classname, loading }) => {
  const baseStyle = 'btn text-white'
  const variantStyle = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : ' hover:bg-base-100 bg-white border !text-blue-600  border-black'

  return (
    <button className={`${baseStyle} ${variantStyle} ${classname}`} onClick={onClick} type={type}>
      {loading ? <LoadingIcon /> : null}  {label}
    </button>
  )
}

export default Button
