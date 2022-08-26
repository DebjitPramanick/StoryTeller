import React from 'react'

interface InputProps {
    label?: string,
    value: string | number,
    setValue: (val: any) => void,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    type?: string,
    placeholder?: string,
    required?: boolean
}

const InputField: React.FC<InputProps> = ({
    label,
    value,
    setValue,
    leftIcon = null,
    rightIcon = null,
    type = "text",
    placeholder = "Enter value",
    required = false
}) => {
    return (
        <div className="mb-6">
            {label && (<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>)}
            <div className="relative">
                {leftIcon && (
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                )}
                <input
                    type={type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    required={required} />
                {rightIcon && (
                    <div className="flex absolute inset-y-0 right-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputField