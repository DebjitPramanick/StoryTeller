import React from 'react'
import Feed from '../../../components/Feed'
import { FeedsLazyLoader } from '../../../components/Loaders';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal';
import StoryEditModal from '../../../components/Modals/StoryEditModal';
import { useModal } from '../../../contexts/ModalContext';
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

    const { isModalOpen, Modals, toggleModal, getModalStateData } = useModal();

    const handleDelete = async() => {
        try {
            const story = getModalStateData(Modals.CNF_MODAL);
            await deleteStory(story._id)
            await fetchUserStories();
            toggleModal(Modals.CNF_MODAL)
            popupMessage("success", "Deleted story successfully.")
        } catch (err: any) {
            popupMessage("error", err.message)
        }
    }

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
                feed={getModalStateData(Modals.STORY_EDIT)}
                fetchUserStories={fetchUserStories}
            />

            <ConfirmationModal
                title={"Are you sure to delete this story?"}
                onAccept={handleDelete}
                open={isModalOpen(Modals.CNF_MODAL)}
                closeModal={() => toggleModal(Modals.CNF_MODAL)}
                accpetLabel="Yes"
                rejectLabel="Cancel" />
        </div>
    )
}

export default StoriesTab