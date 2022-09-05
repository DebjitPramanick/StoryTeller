import { off } from 'process'
import React, { ErrorInfo, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useUser } from '../../contexts/UserContext'
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

  const { user } = useUser();

  useEffect(() => {
    fetchFeeds()
  }, [])

  const fetchFeeds = async () => {
    try {
      const res = await getFeeds();
      console.log(res)
      setFeedsData(res.data)
    } catch (err: any) {
      toast.error(err.message, {
        autoClose: 3500,
        pauseOnHover: true,
      })
    }
  }

  return (
    <FeedsUI
      user={user}
      feeds={feedsData.feeds}
      savedBy={feedsData.savedBy}
      likedBy={feedsData.likedBy} />
  )
}

export default Feeds