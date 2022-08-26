import React from 'react'

interface TextArearops {
    label?: string,
    value: string | number,
    setValue: (val: any) => void,
    placeholder?: string,
    required?: boolean,
    rows?: number
}

const TextAreaField: React.FC<TextArearops> = ({
    label,
    value,
    setValue,
    placeholder = "Enter value",
    required = false,
    rows = 4
}) => {
    return (
        <div className='mb-6'>
            {label && (<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>)}
            <textarea id="message"
                rows={rows}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                style={{resize: 'none'}}></textarea>
        </div>
    )
}

export default TextAreaField