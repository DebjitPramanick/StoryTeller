import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import ProfileUI from './ProfileUI'
import { FeedDetailsType, GlobalUserType } from '../../utils/types';
import { getAuthorStories } from '../../helpers/story.helper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { popupMessage } from '../../helpers/common.helper';
import { useParams } from 'react-router-dom';
import { getUser } from '../../helpers/user.helper';

export interface StoriesDataType {
  stories: FeedDetailsType[],
  savedBy: any,
  likedBy: any
}

const Profile = () => {

  const { user } = useUser()
  const {id} = useParams();

  const [curTab, setCurTab] = useState<number>(0)
  const [storiesData, setStoriesData] = useState<StoriesDataType>({
    stories: [],
    likedBy: {},
    savedBy: {}
  });
  const [fetchingStories, setFetchingStories] = useState<boolean>(false);
  const [curUser, setCurUser] = useState<GlobalUserType>(user);

  const tabs = [
    {
      title: `Stories (${storiesData.stories.length || 0})`,
      icon: <AutoStoriesIcon style={{ width: '16px' }} />
    },
    {
      title: 'Settings',
      icon: <ModeEditIcon style={{ width: '16px' }} />
    },
  ]

  useEffect(() => {
    if(id) fetchUserDetails()
    fetchUserStories()
  }, [id])

  const fetchUserDetails = async() => {
    if(!id) return;
    try {
      const res = await getUser(id)
      setCurUser(res.data)
    } catch(err: any) {
      popupMessage("error", err.message)
    }
  }

  const fetchUserStories = async () => {
    try {
      setFetchingStories(true);
      const userId = id || curUser._id;
      const res = await getAuthorStories(userId)
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
      user={curUser}
      fetchUserStories={fetchUserStories}
      tabs={tabs}
      currentTab={curTab}
      setCurTab={setCurTab}
      storiesData={storiesData}
      fetchingStories={fetchingStories}
      isOtherUser={id ? true : false} />
  )
}

export default Profile