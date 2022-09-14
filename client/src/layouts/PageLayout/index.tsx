import React from 'react'
import Sidebar from '../../components/Sidebar';

const PageLayout: React.FC<any> = ({ pageTitle, children }) => {

    const curPath = window.location.pathname;
    const isAuthPage = curPath.includes('register') || curPath.includes('login')

    return (
        <div className={`max-w-6xl mx-auto flex px-2 py-4 ml-auto relative ${!isAuthPage ? 'gap-6' : ''}`}
            style={{ marginTop: '61px', background: '#fbfbfb', minHeight: 'calc(100vh - 64px)' }}>
            <div style={{ width: isAuthPage ? '0px' : '288px' }}></div>
            <Sidebar />
            <div className='bg-white rounded-lg overflow-hidden' style={{ width: isAuthPage ? '100%' : 'calc(100% - 256px)' }}>
                {pageTitle && (<h1 className='text-2xl font-bold text-gray-500 bg-orange-200 p-2'>{pageTitle}</h1>)}
                <div className='px-4 py-4'>{children}</div>
            </div>
        </div>
    )
}

export default PageLayout