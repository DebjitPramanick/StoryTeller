import React from 'react'

const PageLayout: React.FC<any> = ({ children, isAuthPage }) => {

    return (
        <div className={`flex px-2 py-2 ml-auto ${!isAuthPage ? 'gap-4' : ''}`} style={{ marginTop: '61px' }}>
            <div style={{ width: isAuthPage ? '0px' : '256px' }}></div>
            {children}
        </div>
    )
}

export default PageLayout