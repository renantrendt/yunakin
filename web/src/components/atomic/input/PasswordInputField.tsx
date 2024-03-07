'use client'
import React from 'react'
import InputField from './InputField'
import LockOnIcon from '@/icons/LockOnIcon.svg'
import LockOffIcon from '@/icons/LockOffIcon.svg'

interface PasswordInputFieldProps extends React.ComponentProps<typeof InputField> {

}
const PasswordInputField: React.FC<PasswordInputFieldProps> = (props) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
        <InputField
            {...props}
            type={showPassword ? 'text' : 'password'}
            leadingIcon={null}
            trailingIcon={
                <span onClick={() => setShowPassword(!showPassword)} className='hover:cursor-pointer'>
                    {showPassword ?
                        <LockOffIcon /> : <LockOnIcon />}
                </span>
            }
        />
    )
}

export default PasswordInputField