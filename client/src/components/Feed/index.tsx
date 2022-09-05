import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
import { dislikeFeed, likeFeed } from '../../helpers/feeds.helper'
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

    const handleLikeFeed = async () => {
        if (!user) return;
        try {
            if (user._id && feed._id ) {
                if (!localIsLiked) {
                    await likeFeed(user._id, feed._id)
                } else {
                    await dislikeFeed(user._id, feed._id)
                }
            }
            setLocalIsLiked(!localIsLiked);
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 3500,
                pauseOnHover: true,
            })
        }
    }

    const handleSaveFeed = async () => {
        try {
            setLocalIsSaved(!localIsSaved);
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
            likeCounts={likeCounts}
            savedCounts={savedCounts}
            handleLikeFeed={handleLikeFeed}
            handleSaveFeed={handleSaveFeed}
        />
    )
}

export default Feed