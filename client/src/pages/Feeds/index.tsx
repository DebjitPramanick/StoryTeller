import { off } from 'process'
import React, { ErrorInfo, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
import { popupMessage } from '../../helpers/common.helper'
import { getFeeds } from '../../helpers/feeds.helper'
import { FeedDetailsType } from '../../utils/types'
import FeedsUI from './FeedsUI'

interface FeedsDataType {
  feeds: FeedDetailsType[],
  savedBy: any,
  likedBy: any
}

const Feeds: React.FC<any> = () => {

  const [feedsData, setFeedsData] = useState<FeedsDataType>({
    feeds: [],
    likedBy: {},
    savedBy: {}
  })
  const [fetchingFeeds, setFetchingFeeds] = useState<boolean>(false);

  const { user } = useUser();

  useEffect(() => {
    fetchFeeds()
  }, [])

  const fetchFeeds = async () => {
    try {
      setFetchingFeeds(true);
      const res = await getFeeds();
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
    <FeedsUI
      user={user}
      feeds={feedsData.feeds}
      savedBy={feedsData.savedBy}
      likedBy={feedsData.likedBy}
      fetching={fetchingFeeds} />
  )
}

export default Feeds