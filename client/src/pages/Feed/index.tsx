import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext';
import { popupMessage } from '../../helpers/common.helper';
import { dislikeFeed, getFeedById, likeFeed, removeFeed, saveFeed } from '../../helpers/feeds.helper';
import PageLayout from '../../layouts/PageLayout'
import { FeedDetailsType } from '../../utils/types';
import FeedPageUI from './FeedPageUI';

const Story = () => {

  const params = useParams();
  const { user } = useUser();

  const [feed, setFeed] = useState<FeedDetailsType>()
  const [likedBy, setLikedBy] = useState<string[]>([]);
  const [savedBy, setSavedBy] = useState<string[]>([]);
  const [fetchingFeed, setFetchingFeed] = useState<boolean>(false);
  const [localLikesCount, setLocalLikesCount] = useState<number>(0);
  const [localSavesCount, setLocalSavesCount] = useState<number>(0);
  const [localIsLiked, setLocalIsLiked] = useState<boolean>(false);
  const [localIsSaved, setLocalIsSaved] = useState<boolean>(false);

  useEffect(() => {
    fetchFeed()
  }, [])


  const fetchFeed = async () => {
    setFetchingFeed(true);
    try {
      const feedId = params.id || "";
      const res = await getFeedById(feedId);
      const feedData = res.data.feed;
      const likes: string[] = res.data.likedBy;
      const saves: string[] = res.data.savedBy;
      setFeed(feedData);
      setLikedBy(likes)
      setSavedBy(saves)
      setFetchingFeed(false);
      setLocalLikesCount(likes.length)
      setLocalSavesCount(saves.length)
      setLocalIsLiked(likes.includes(user._id));
      setLocalIsSaved(saves.includes(user._id));
      console.log(likes, user._id)
    } catch (err: any) {
      popupMessage("error", err.message);
      setFetchingFeed(false);
    }
  }

  const handleLikeFeed = async () => {
    if(!feed) return;
    try {
      if (!localIsLiked) {
        await likeFeed(user._id, feed._id)
        setLocalLikesCount(localLikesCount + 1);
      } else {
        await dislikeFeed(user._id, feed._id)
        setLocalLikesCount(localLikesCount - 1);
      }
      setLocalIsLiked(!localIsLiked);
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  const handleSaveFeed = async () => {
    if(!feed) return;
    try {
      if (!localIsSaved) {
        await saveFeed(user._id, feed._id);
        setLocalSavesCount(localSavesCount + 1);
      } else {
        await removeFeed(user._id, feed._id);
        setLocalSavesCount(localSavesCount - 1);
      }
      setLocalIsSaved(!localIsSaved);
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  return (
    <FeedPageUI
      feed={feed}
      savedBy={savedBy}
      likedBy={likedBy}
      fetchingFeed={fetchingFeed}
      handleLikeFeed={handleLikeFeed}
      handleSaveFeed={handleSaveFeed}
      isLiked={localIsLiked}
      isSaved={localIsSaved}
      likesCount={localLikesCount}
      savesCount={localSavesCount} />
  )
}

export default Story