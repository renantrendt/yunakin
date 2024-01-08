// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', placeholder, value, onChange }) => {
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
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
