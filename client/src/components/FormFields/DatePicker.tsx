import React from 'react'

interface DatePickerProps {
    label?: string,
    date: string,
    setDate: (val: any) => void,
    placeholder?: string,
    required?: boolean,
}

const DatePicker: React.FC<DatePickerProps> = ({
    label,
    date,
    setDate,
    placeholder = "Select date",
    required = false,
}) => {

    return (
        <div className="mb-6">
            {label && (<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>)}
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder={placeholder} 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required={required}/>
            </div>
        </div>
    )
}

export default DatePicker