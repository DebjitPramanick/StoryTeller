import React from 'react'
import Feed from '../../../components/Feed'
import { gtCounts, handleCheck } from '../../../helpers/common.helper'
import { FeedDetailsType, GlobalUserType } from '../../../utils/types'

interface UIProps {
    user: GlobalUserType;
    stories: FeedDetailsType[];
    savedBy: any;
    likedBy: any
}

const StoriesTab: React.FC<UIProps> = ({
    user,
    stories,
    likedBy,
    savedBy
}) => {
    return (
        <div>
            {stories && stories.map((feed: FeedDetailsType) => (
                <Feed
                    key={feed._id}
                    feed={feed}
                    isLiked={handleCheck(feed._id, 'like', likedBy, user._id)}
                    isSaved={handleCheck(feed._id, 'save', savedBy, user._id)}
                    likeCounts={gtCounts(feed._id, 'like', likedBy)}
                    savedCounts={gtCounts(feed._id, 'save', savedBy)} />
            ))}
        </div>
    )
}

export default StoriesTab