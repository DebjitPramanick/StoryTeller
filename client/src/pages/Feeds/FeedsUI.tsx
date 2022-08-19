import React from 'react'
import Feed from '../../components/Feed'

const FeedsUI: React.FC<any> = () => {
    return (
        <div>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Feeds</h1>
            {[1, 2, 3, 4, 5].map(feed => (
                <Feed />
            ))}
        </div>
    )
}

export default FeedsUI