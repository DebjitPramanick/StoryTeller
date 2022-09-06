import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
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
            } else {
                await dislikeFeed(user._id, feed._id)
            }
            setLocalIsLiked(!localIsLiked);
            setLocalLikesCount(localLikesCount-1);
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 3500,
                pauseOnHover: true,
            })
        }
    }

    const handleSaveFeed = async () => {
        try {
            if (!localIsSaved) {
                await saveFeed(user._id, feed._id)
            } else {
                await removeFeed(user._id, feed._id)
            }
            setLocalIsSaved(!localIsSaved);
            setLocalSavesCount(localSavesCount-1);
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 3500,
                pauseOnHover: true,
            })
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