import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
import { popupMessage } from '../../helpers/common.helper'
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
    const [fetchingFeeds, setFetchingFeeds] = useState<boolean>(false);

    const { user } = useUser();

    useEffect(() => {
        fetchSavedFeeds()
    }, [])

    const fetchSavedFeeds = async () => {
        try {
            setFetchingFeeds(true);
            const res = await getSavedFeeds(user._id)
            setFeedsData({
                feeds: res.data.feeds || [],
                likedBy: res.data.likedBy,
                savedBy: res.data.savedBy
            })
            setFetchingFeeds(false);
        } catch (err: any) {
            popupMessage('error', err.message);
            setFetchingFeeds(false);
        }
    }

    return (
        <SavedItemsUI
            user={user}
            feeds={feedsData.feeds}
            savedBy={feedsData.savedBy}
            likedBy={feedsData.likedBy}
            fetching={fetchingFeeds} />
    )
}

export default SavedItems