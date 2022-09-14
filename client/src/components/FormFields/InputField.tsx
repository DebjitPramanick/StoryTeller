import React from 'react'

interface InputProps {
    label?: string,
    value: string | number,
    setValue: (val: any) => void,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    type?: string,
    placeholder?: string,
    required?: boolean,
    boxStyle?: 'normal' | 'fancy'
}

const InputField: React.FC<InputProps> = ({
    label,
    value,
    setValue,
    leftIcon = null,
    rightIcon = null,
    type = "text",
    placeholder = "Enter value",
    required = false,
    boxStyle='normal'
}) => {

    const normalInputClassNames = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full";
    const fancyInputClassNames = "border-0 text-black text-4xl rounded focus:ring-0 focus:border-0 block w-full px-0 py-3"

    return (
        <div className="mb-6">
            {label && (<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>)}
            <div className="relative">
                {leftIcon && (
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                <input
                    type={type}
                    className={`${boxStyle === 'fancy' ? fancyInputClassNames : normalInputClassNames} ${leftIcon && 'pl-10'} ${rightIcon && 'pr-10'}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    required={required} />
                {rightIcon && (
                    <div className="flex absolute inset-y-0 right-0 items-center pl-3 pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputField