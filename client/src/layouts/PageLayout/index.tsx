import React from 'react'
import Sidebar from '../../components/Sidebar';

const PageLayout: React.FC<any> = ({ children }) => {

    const curPath = window.location.pathname;
    const isAuthPage = curPath.includes('register') || curPath.includes('login')

    return (
        <div className={`max-w-6xl mx-auto flex px-2 py-4 ml-auto relative ${!isAuthPage ? 'gap-6' : ''}`}
            style={{ marginTop: '61px', background: '#fbfbfb', minHeight: 'calc(100vh - 64px)' }}>
            <div style={{ width: isAuthPage ? '0px' : '288px' }}></div>
            <Sidebar />
            <div className='px-4 py-4 bg-white border rounded-lg' style={{ width: isAuthPage ? '100%' : 'calc(100% - 256px)' }}>
                {children}
            </div>
        </div>
    )
}

export default PageLayout