// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    id: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    additionalProps?: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', placeholder, onChange, error, id, ...additionalProps }) => {
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
                id={id}
                onChange={onChange}
                {...additionalProps}
            />
            {error && <p className='text-red-300'>{error}</p>}
        </div>
    );
};

export default InputField;
