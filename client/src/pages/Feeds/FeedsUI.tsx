import React from 'react'
import Feed from '../../components/Feed'
import PageLayout from '../../layouts/PageLayout'
import { FeedDetailsType, UserDetailsType } from '../../utils/types'

interface FeedsUIProps {
    user: UserDetailsType | null,
    feeds: FeedDetailsType[],
    savedBy: any,
    likedBy: any
}

const FeedsUI: React.FC<FeedsUIProps> = ({
    user,
    feeds,
    likedBy,
    savedBy
}) => {

    const handleCheck = (feedId: string | undefined, type: 'like' | 'save') => {
        if(!feedId) return false;
        if(type === 'save') {
            return Object.keys(likedBy).length !== 0 && likedBy[feedId].includes(user?._id || "")
        } else {
            return Object.keys(savedBy).length !== 0 && savedBy[feedId].includes(user?._id || "")
        }
    }

    const gtCounts = (feedId: string | undefined, type: 'like' | 'save') => {
        if(!feedId) return false;
        if(type === 'save') {
            return Object.keys(likedBy).length !== 0 && likedBy[feedId].length
        } else {
            return Object.keys(savedBy).length !== 0 && savedBy[feedId].length
        }
    }

    return (
        <PageLayout>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Feeds</h1>
            {feeds && feeds.map((feed: FeedDetailsType) => (
                <Feed
                    key={feed._id}
                    feed={feed}
                    isLiked={handleCheck(feed._id, 'like')}
                    isSaved={handleCheck(feed._id, 'save')}
                    likeCounts={gtCounts(feed._id, 'like')}
                    savedCounts={gtCounts(feed._id, 'save')} />
            ))}
        </PageLayout>
    )
}

export default FeedsUI