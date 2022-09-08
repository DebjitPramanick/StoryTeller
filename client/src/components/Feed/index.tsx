import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
import { popupMessage } from '../../helpers/common.helper'
import { dislikeFeed, likeFeed, removeFeed, saveFeed } from '../../helpers/feeds.helper'
import { FeedDetailsType } from '../../utils/types'
import FeedUI from './FeedUI'

export interface FeedProps {
    feed: FeedDetailsType,
    isLiked: boolean,
    isSaved: boolean,
    likeCounts: number,
    savedCounts: number
}

const Feed: React.FC<FeedProps> = ({
    feed,
    isLiked,
    isSaved,
    likeCounts,
    savedCounts
}) => {

    const { user } = useUser();
    const [localIsLiked, setLocalIsLiked] = useState<boolean>(isLiked);
    const [localIsSaved, setLocalIsSaved] = useState<boolean>(isSaved);
    const [localLikesCount, setLocalLikesCount] = useState<number>(likeCounts);
    const [localSavesCount, setLocalSavesCount] = useState<number>(savedCounts);

    const handleLikeFeed = async () => {
        try {
            if (!localIsLiked) {
                await likeFeed(user._id, feed._id)
                setLocalLikesCount(localLikesCount+1);
            } else {
                await dislikeFeed(user._id, feed._id)
                setLocalLikesCount(localLikesCount-1);
            }
            setLocalIsLiked(!localIsLiked);
        } catch (err: any) {
            popupMessage('error', err.message);
        }
    }

    const handleSaveFeed = async () => {
        try {
            if (!localIsSaved) {
                await saveFeed(user._id, feed._id);
                setLocalSavesCount(localSavesCount+1);
            } else {
                await removeFeed(user._id, feed._id);
                setLocalSavesCount(localSavesCount-1);
            }
            setLocalIsSaved(!localIsSaved);
        } catch (err: any) {
            popupMessage('error', err.message);
        }
    }


    return (
        <FeedUI
            feed={feed}
            isLiked={localIsLiked}
            isSaved={localIsSaved}
            likeCounts={localLikesCount}
            savedCounts={localSavesCount}
            handleLikeFeed={handleLikeFeed}
            handleSaveFeed={handleSaveFeed}
        />
    )
}

export default Feed