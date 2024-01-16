// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    additionalProps?: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', placeholder, onChange, error, additionalProps }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="input input-bordered"
                name={name}
                onChange={onChange}
                {...additionalProps}
            />
            {error && <p className='text-red-300'>{error}</p>}
        </div>
    );
};

export default InputField;
