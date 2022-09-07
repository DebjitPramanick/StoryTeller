import React from 'react'
import Sidebar from '../../components/Sidebar';

const PageLayout: React.FC<any> = ({ children }) => {

    const curPath = window.location.pathname;
    const isAuthPage = curPath.includes('register') || curPath.includes('login')

    return (
        <div className={`flex px-2 py-2 ml-auto relative ${!isAuthPage ? 'gap-6' : ''}`}
            style={{ marginTop: '61px', background: '#fbfbfb' }}>
            <div style={{ width: isAuthPage ? '0px' : '288px' }}></div>
            <Sidebar />
            <div className='px-4 py-4 bg-white border rounded-lg' style={{ width: isAuthPage ? '100%' : 'calc(100% - 256px)' }}>
                {children}
            </div>
        </div>
    )
}

export default PageLayout