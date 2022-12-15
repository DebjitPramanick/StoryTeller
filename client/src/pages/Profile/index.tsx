import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import ProfileUI from './ProfileUI'
import { FeedDetailsType, GlobalUserType } from '../../utils/types';
import { getAuthorStories } from '../../helpers/story.helper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { popupMessage } from '../../helpers/common.helper';
import { useParams } from 'react-router-dom';
import { checkIfFollowing, followUser, getFollowersByUserID, getUser, unfollowUser } from '../../helpers/user.helper';

export interface StoriesDataType {
  stories: FeedDetailsType[],
  savedBy: any,
  likedBy: any
}

const Profile = () => {

  const { user } = useUser()
  const { id } = useParams();

  const [curTab, setCurTab] = useState<number>(0)
  const [storiesData, setStoriesData] = useState<StoriesDataType>({
    stories: [],
    likedBy: {},
    savedBy: {}
  });
  const [fetchingStories, setFetchingStories] = useState<boolean>(false);
  const [curUser, setCurUser] = useState<GlobalUserType>(user);
  const [followers, setFollowers] = useState<{count: number, users: GlobalUserType[]}>({
    count: 0,
    users: []
  });
  const [isFollowing, setIsFollowing] = useState(false);

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
    if (id) {
      fetchUserDetails()
      handleCheckIfFollowing()
    }
    fetchUserStories()
    fetchFollowers()
  }, [id])

  const fetchUserDetails = async () => {
    if (!id) return;
    try {
      const res = await getUser(id)
      setCurUser(res.data)
    } catch (err: any) {
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

  const fetchFollowers = async () => {
    try {
      const userId = id || curUser._id;
      const res = await getFollowersByUserID(userId)
      if (res.data.followers) {
        setFollowers({
          count: res.data.count,
          users: res.data.followers
        })
      }
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  const handleCheckIfFollowing = async () => {
    if (!id) return;
    try {
      const res = await checkIfFollowing(id, user._id)
      if (res.data.isFollowing) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false);
      }
    } catch (err: any) {
      popupMessage('error', err.message);
    }
  }

  const handleFollowUser = async () => {
    try {
      const targetUserID = id || '';
      if(!isFollowing) {
        await followUser(targetUserID, user._id);
        popupMessage("success", "Followed successfully.")
        setIsFollowing(true);
        let newFollowers = followers.users;
        newFollowers.push(user);
        setFollowers({
          count: followers.count + 1,
          users: newFollowers
        })
      } else {
        await unfollowUser(targetUserID, user._id);
        popupMessage("success", "Unfollowed successfully.")
        setIsFollowing(false);
        let newFollowers = followers.users.filter((u: any) => u._id !== user._id);
        newFollowers.push(user);
        setFollowers({
          count: followers.count - 1,
          users: newFollowers,
        })
      }
    } catch (err: any) {
      popupMessage('error', err.message)
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
      isOtherUser={id && id !== user._id ? true : false}
      handleFollowUser={handleFollowUser}
      followers={followers} 
      isFollowing={isFollowing} />
  )
}

export default Profile