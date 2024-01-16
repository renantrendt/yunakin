// components/Button.tsx
import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "reset" | "submit" | undefined;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick, type }) => {
    const baseStyle = 'btn';
    const variantStyle = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    return (
        <button className={`${baseStyle} ${variantStyle}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
