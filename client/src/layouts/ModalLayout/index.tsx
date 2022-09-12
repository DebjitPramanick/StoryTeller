import React from 'react'

const ModalLayout: React.FC<any> = ({ children, isDarkBG, scrollBar }) => {
    return (
        <div id="defaultModal" aria-hidden="true"
        style={{background: isDarkBG ? '#0000009c' : ''}}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
            <div className="relative p-4 w-full max-w-2xl md:h-auto h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow" style={{maxHeight: '80vh', overflowY: scrollBar ? 'scroll' : 'auto'}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalLayout