import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { registerUser } from '../../helpers/auth.helper'
import RegitserUI from './RegitserUI'

export interface UserDetailsType {
  name: string,
  email: string,
  username?: string,
  password?: string,
  bio?: string,
  avatar?: string,
  country?: string,
  dob?: string,
  gender?: 'M' | 'F' | 'T',
}

const initialData: UserDetailsType = {
  name: '',
  email: '',
  password: '',
  username: '',
  country: 'India',
  dob: new Date().toDateString(),
  gender: 'M',
  avatar: ''
}

const Register = () => {

  const {isLoggedIn} = useUser();

  const [data, setData] = useState<UserDetailsType>(initialData)

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      data.avatar = `https://api.multiavatar.com/${data.username}.png`
      await registerUser(data);
      window.location.href = "/login"
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({...data, [field]: value})
  }

  if(isLoggedIn) return <Navigate to={"/"}/>

  return (
    <RegitserUI
      handleRegister={handleRegister}
      data={data}
      handleChangeData={handleChangeData} />
  )
}

export default Register