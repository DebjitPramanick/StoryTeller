import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { popupMessage } from '../../helpers/common.helper';
import { getFeedById } from '../../helpers/feeds.helper';
import PageLayout from '../../layouts/PageLayout'
import { FeedDetailsType } from '../../utils/types';
import FeedPageUI from './FeedPageUI';

const Story = () => {

  const params = useParams();

  const [feed, setFeed] = useState<FeedDetailsType>()
  const [likedBy, setLikedBy] = useState([]);
  const [savedBy, setSavedBy] = useState([]);
  const [fetchingFeed, setFetchingFeed] = useState<boolean>(false);

  useEffect(() => {
    fetchFeed()
  }, [])


  const fetchFeed = async () => {
    try {
      const feedId = params.id || "";
      const res = await getFeedById(feedId);
      console.log(res)
      // setFeed();
    } catch (err: any) {
      popupMessage("error", err.message)
    }
  }

  const handleLikeFeed = () => {

  }

  const handleSaveFeed = () => {
    
  }

  return (
    <FeedPageUI
      feed={feed}
      savedBy={savedBy}
      likedBy={likedBy}
      fetchingFeed={fetchingFeed}
      handleLikeFeed={handleLikeFeed}
      handleSaveFeed={handleSaveFeed} />
  )
}

export default Story