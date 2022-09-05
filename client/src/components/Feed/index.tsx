import React, { useState } from 'react'
import { toast } from 'react-toastify'
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

    const [localIsLiked, setLocalIsLiked] = useState<boolean>(isLiked);
    const [localIsSaved, setLocalIsSaved] = useState<boolean>(isSaved);

    const handleLikeFeed = async () => {
        try {
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