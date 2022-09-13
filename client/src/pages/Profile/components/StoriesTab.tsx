import React from 'react'
import Feed from '../../../components/Feed'
import { FeedsLazyLoader } from '../../../components/Loaders';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal';
import StoryEditModal from '../../../components/Modals/StoryEditModal';
import { gtCounts, handleCheck, popupMessage } from '../../../helpers/common.helper'
import { deleteStory } from '../../../helpers/story.helper';
import { FeedDetailsType, GlobalUserType } from '../../../utils/types'

interface UIProps {
    user: GlobalUserType;
    stories: FeedDetailsType[];
    savedBy: any;
    likedBy: any;
    fetchingStories: boolean;
    fetchUserStories: () => void;
}

const StoriesTab: React.FC<UIProps> = ({
    user,
    stories,
    likedBy,
    savedBy,
    fetchingStories,
    fetchUserStories
}) => {
    return (
        <div>
            {fetchingStories ? <FeedsLazyLoader /> :
                stories.length > 0 ? stories.map((feed: FeedDetailsType) => (
                    <Feed
                        key={feed._id}
                        feed={feed}
                        isLiked={handleCheck(feed._id, 'like', likedBy, user._id)}
                        isSaved={handleCheck(feed._id, 'save', savedBy, user._id)}
                        likeCounts={gtCounts(feed._id, 'like', likedBy)}
                        savedCounts={gtCounts(feed._id, 'save', savedBy)}
                        enableActions={true}
                        refetchUserStories={fetchUserStories} />
                ))
                    : <p className='mt-6 text-xl'>No Stories</p>}
        </div>
    )
}

export default StoriesTab