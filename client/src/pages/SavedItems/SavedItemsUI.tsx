import React from 'react'
import Feed from '../../components/Feed';
import { FeedsLazyLoader } from '../../components/Loaders';
import { gtCounts, handleCheck } from '../../helpers/common.helper';
import PageLayout from '../../layouts/PageLayout';
import { FeedDetailsType, GlobalUserType } from '../../utils/types';

interface UIProps {
    user: GlobalUserType,
    feeds: FeedDetailsType[],
    savedBy: any,
    likedBy: any,
    fetching: boolean
}

const SavedItemsUI: React.FC<UIProps> = ({
    user,
    feeds,
    likedBy,
    savedBy,
    fetching
}) => {
    return (
        <PageLayout pageTitle="Saved Items">
            {fetching ? <FeedsLazyLoader /> :
                feeds.length > 0 ? feeds.map((feed: FeedDetailsType) => (
                    <Feed
                        key={feed._id}
                        feed={feed}
                        isLiked={handleCheck(feed._id, 'like', likedBy, user._id)}
                        isSaved={handleCheck(feed._id, 'save', savedBy, user._id)}
                        likeCounts={gtCounts(feed._id, 'like', likedBy)}
                        savedCounts={gtCounts(feed._id, 'save', savedBy)} />
                )) : <p className='mt-6 text-xl'>No Feeds</p>
            }
        </PageLayout>
    )
}

export default SavedItemsUI