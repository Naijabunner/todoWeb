import React, { HTMLInputTypeAttribute, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomInputProps {
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute | 'textarea';
    placeholder?: string;
    className?: string;
    onChange:(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: any
    error?: string | null;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    className,
    onChange,
    error,
    value
}) => {


    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {type !== 'textarea' ? (<input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={twMerge(
                    'mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm',
                    className,
                    error ? 'border-red-500' : ''
                )}
            />) :(
                <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                rows={8}
                onChange={onChange}
                className={twMerge(
                    'mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm',
                    className,
                    error ? 'border-red-500' : ''
                )}
                ></textarea>
            )}
            {error && <p className="mt-2 text-sm line-clamp-1 text-red-600">{error}</p>}
        </div>
    );
};

export default CustomInput;