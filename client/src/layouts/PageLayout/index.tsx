import React from 'react'

const PageLayout: React.FC<any> = ({ children }) => {

    const curPath = window.location.pathname;
    const isAuthPage = curPath.includes('register') || curPath.includes('login')

    return (
        <div className={`flex px-2 py-2 ml-auto ${!isAuthPage ? 'gap-4' : ''}`} style={{ marginTop: '61px' }}>
            <div style={{ width: isAuthPage ? '0px' : '256px' }}></div>
            {children}
        </div>
    )
}

export default PageLayout