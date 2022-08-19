import React from 'react'

const FormLayout: React.FC<any> = ({ children }) => {
    return (
        <div className='rounded shadow-md px-4 py-4' style={{width: '400px'}}>
            {children}
        </div>
    )
}

export default FormLayout