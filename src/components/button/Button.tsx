// components/Button.tsx
import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "reset" | "submit" | undefined;
    classname: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick, type, classname }) => {
    const baseStyle = 'btn';
    const variantStyle = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    return (
        <button className={`${baseStyle} ${variantStyle} ${classname}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
