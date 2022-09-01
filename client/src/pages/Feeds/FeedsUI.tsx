import React from 'react'
import Feed from '../../components/Feed'
import PageLayout from '../../layouts/PageLayout'
import { FeedDetailsType } from '../../utils/types'

const FeedsUI: React.FC<any> = ({
    feeds
}) => {
    return (
        <PageLayout>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Feeds</h1>
            {feeds && feeds.map((feed: FeedDetailsType) => (
                <Feed key={feed._id} feed={feed}/>
            ))}
        </PageLayout>
    )
}

export default FeedsUI