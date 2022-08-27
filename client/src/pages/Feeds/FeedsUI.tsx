import React from 'react'
import Feed from '../../components/Feed'
import { FeedDetailsType } from '../../utils/types'

const FeedsUI: React.FC<any> = ({
    feeds
}) => {
    return (
        <div>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Feeds</h1>
            {feeds.map((feed: FeedDetailsType) => (
                <Feed key={feed._id} feed={feed}/>
            ))}
        </div>
    )
}

export default FeedsUI