import React from 'react'
import Sidebar from '../../components/Sidebar';

const PageLayout: React.FC<any> = ({ children }) => {

    const curPath = window.location.pathname;
    const isAuthPage = curPath.includes('register') || curPath.includes('login')

    return (
        <div className={`flex px-2 py-2 ml-auto relative ${!isAuthPage ? 'gap-4' : ''}`} style={{ marginTop: '61px' }}>
            <div style={{ width: isAuthPage ? '0px' : '256px' }}></div>
            <Sidebar />
            <div style={{ width: isAuthPage ? '100%' : 'calc(100% - 256px)' }}>
                {children}
            </div>
        </div>
    )
}

export default PageLayout