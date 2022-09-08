import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import ProfileUI from './ProfileUI'
import { FeedDetailsType } from '../../utils/types';
import { getAuthorStories } from '../../helpers/story.helper';
import { toast } from 'react-toastify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { popupMessage } from '../../helpers/common.helper';

export interface StoriesDataType {
  stories: FeedDetailsType[],
  savedBy: any,
  likedBy: any
}

const Profile = () => {

  const { user } = useUser()

  const [curTab, setCurTab] = useState<number>(0)
  const [storiesData, setStoriesData] = useState<StoriesDataType>({
    stories: [],
    likedBy: {},
    savedBy: {}
  });
  const [fetchingStories, setFetchingStories] = useState<boolean>(false);

  const tabs = [
    {
      title: `Stories (${storiesData.stories.length || 0})`,
      icon: <AutoStoriesIcon style={{ width: '16px' }} />
    },
    {
      title: 'Edit',
      icon: <ModeEditIcon style={{ width: '16px' }} />
    },
  ]

  useEffect(() => {
    fetchUserStories()
  }, [])

  const fetchUserStories = async () => {
    try {
      setFetchingStories(true);
      const res = await getAuthorStories(user._id)
      setStoriesData({
        stories: res.data.stories || [],
        likedBy: res.data.likedBy,
        savedBy: res.data.savedBy
      })
      setFetchingStories(false);
    } catch (err: any) {
      popupMessage('error', err.message);
      setFetchingStories(false);
    }
  }

  return (
    <ProfileUI
      user={user}
      fetchUserStories={fetchUserStories}
      tabs={tabs}
      currentTab={curTab}
      setCurTab={setCurTab}
      storiesData={storiesData}
      fetchingStories={fetchingStories} />
  )
}

export default Profile