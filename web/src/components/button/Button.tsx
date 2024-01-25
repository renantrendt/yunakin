// components/Button.tsx
import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit' | undefined
  classname?: string
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick, type, classname }) => {
  const baseStyle = 'btn text-white'
  const variantStyle = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : ' hover:bg-base-100 bg-white border !text-blue-600  border-black'

  return (
    <button className={`${baseStyle} ${variantStyle} ${classname}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
