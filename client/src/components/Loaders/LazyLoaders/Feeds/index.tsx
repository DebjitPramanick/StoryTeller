import React from 'react'
import "../styles.css"

const FeedsLazyLoader = () => {
    return (
        <div className='w-full'>
            {[1, 2, 3, 4, 5].map(f => (
                <div className='mb-4 max-w-4xl rounded-lg border border-gray-200 shadow-md skeleton'>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <div className="flex-shrink-0 w-12 h-12 skeleton shadow-lg rounded-full">
                        </div>
                        <div className="flex-1 max-w-sm h-10 skeleton shadow-lg rounded-lg">
                        </div>
                    </div>

                    <div className='h-52 skeleton shadow-lg rounded-lg mx-4 my-2'>
                    </div>

                    <div className="p-5 skeleton shadow-lg rounded-lg mx-4 my-2 max-w-sm h-20">
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeedsLazyLoader