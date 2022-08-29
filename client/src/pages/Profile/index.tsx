import React from 'react'
import { useUser } from '../../contexts/UserContext'
import ProfileUI from './ProfileUI'

const Profile = () => {

  const {user} = useUser()

  return (
    <ProfileUI 
    user={user}/>
  )
}

export default Profile