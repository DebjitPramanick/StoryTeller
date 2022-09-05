import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import ProfileUI from './ProfileUI'
import { StoryDetailsType } from '../../utils/types';
import { getAuthorStories } from '../../helpers/story.helper';
import { toast } from 'react-toastify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Profile = () => {

  const { user } = useUser()

  const [curTab, setCurTab] = useState<number>(0)
  const [userStories, setUserStories] = useState<StoryDetailsType[]>([]);

  const tabs = [
    {
      title: `Stories (${userStories?.length || 0})`,
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
      const res = await getAuthorStories(user._id)
      setUserStories(res.data)
    } catch (err: any) {
      toast.error(err.message, {
        autoClose: 3500,
        pauseOnHover: true,
      })
    }
  }

  return (
    <ProfileUI
      user={user}
      fetchUserStories={fetchUserStories}
      tabs={tabs}
      currentTab={curTab}
      setCurTab={setCurTab}
      userStories={userStories} />
  )
}

export default Profile