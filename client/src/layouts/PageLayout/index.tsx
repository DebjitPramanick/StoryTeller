import React from 'react'

const PageLayout: React.FC<any> = ({ children }) => {
    return (
        <div className='flex px-2 py-2 ml-auto gap-4' style={{ marginTop: '61px' }}>
            <div style={{ width: '256px' }}></div>
            {children}
        </div>
    )
}

export default PageLayout