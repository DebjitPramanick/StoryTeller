import React from 'react'

const AuthLayout: React.FC<any> = ({children}) => {
    return (
        <div className={`flex justify-center w-full`} style={{ marginTop: '61px' }}>
            {children}
        </div>
    )
}

export default AuthLayout