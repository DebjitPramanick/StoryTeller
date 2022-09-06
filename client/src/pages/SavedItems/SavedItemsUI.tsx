import React from 'react'
import Feed from '../../components/Feed';
import { gtCounts, handleCheck } from '../../helpers/common.helper';
import PageLayout from '../../layouts/PageLayout';
import { FeedDetailsType, GlobalUserType } from '../../utils/types';

interface UIProps {
    user: GlobalUserType,
    feeds: FeedDetailsType[],
    savedBy: any,
    likedBy: any
}

const SavedItemsUI: React.FC<UIProps> = ({
    user,
    feeds,
    likedBy,
    savedBy
}) => {
    return (
        <PageLayout>
            <h1 className='mb-5 text-2xl font-bold text-gray-900'>Saved Items</h1>
            {feeds && feeds.map((feed: FeedDetailsType) => (
                <Feed
                    key={feed._id}
                    feed={feed}
                    isLiked={handleCheck(feed._id, 'like', likedBy, user._id)}
                    isSaved={handleCheck(feed._id, 'save', savedBy, user._id)}
                    likeCounts={gtCounts(feed._id, 'like', likedBy)}
                    savedCounts={gtCounts(feed._id, 'save', savedBy)} />
            ))}
        </PageLayout>
    )
}

export default SavedItemsUI