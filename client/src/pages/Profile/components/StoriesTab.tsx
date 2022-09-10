import React from 'react'
import Feed from '../../../components/Feed'
import { FeedsLazyLoader } from '../../../components/Loaders';
import StoryEditModal from '../../../components/Modals/StoryEditModal';
import { useModal } from '../../../contexts/ModalContext';
import { gtCounts, handleCheck } from '../../../helpers/common.helper'
import { FeedDetailsType, GlobalUserType } from '../../../utils/types'

interface UIProps {
    user: GlobalUserType;
    stories: FeedDetailsType[];
    savedBy: any;
    likedBy: any;
    fetchingStories: boolean
}

const StoriesTab: React.FC<UIProps> = ({
    user,
    stories,
    likedBy,
    savedBy,
    fetchingStories
}) => {

    const { isModalOpen, Modals, toggleModal } = useModal();

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
                        enableActions={true} />
                ))
                    : <p className='mt-6 text-xl'>No Stories</p>}

            <StoryEditModal
                open={isModalOpen(Modals.STORY_EDIT)}
                closeModal={() => toggleModal(Modals.STORY_EDIT)}
            />
        </div>
    )
}

export default StoriesTab