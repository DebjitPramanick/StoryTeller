import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
import { getSavedFeeds } from '../../helpers/feeds.helper'
import { FeedDetailsType } from '../../utils/types'
import SavedItemsUI from './SavedItemsUI'

interface FeedsDataType {
    feeds: FeedDetailsType[],
    savedBy: any,
    likedBy: any
}

const SavedItems = () => {

    const [feedsData, setFeedsData] = useState<FeedsDataType>({
        feeds: [],
        likedBy: {},
        savedBy: {}
    })

    const { user } = useUser();

    useEffect(() => {
        fetchSavedStories()
    }, [])

    const fetchSavedStories = async () => {
        try {
            const res = await getSavedFeeds(user._id)
            setFeedsData({
                feeds: res.data.feeds || [],
                likedBy: res.data.likedBy,
                savedBy: res.data.savedBy
            })
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 3500,
                pauseOnHover: true,
            })
        }
    }

    return (
        <SavedItemsUI
            user={user}
            feeds={feedsData.feeds}
            savedBy={feedsData.savedBy}
            likedBy={feedsData.likedBy} />
    )
}

export default SavedItems