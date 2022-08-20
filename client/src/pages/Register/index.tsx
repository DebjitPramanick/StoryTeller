import React, { useState } from 'react'
import { UserDetailsType } from '../../contexts/UserContext'
import { registerUser } from '../../helpers/auth.helper'
import RegitserUI from './RegitserUI'

const initialData: UserDetailsType = {
  name: '',
  email: '',
  password: '',
  username: ''
}

const Register = () => {

  const [data, setData] = useState<UserDetailsType>(initialData)

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await registerUser(data);
      window.location.href = "/login"
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({...data, [field]: value})
  }

  return (
    <RegitserUI
      handleRegister={handleRegister}
      data={data}
      handleChangeData={handleChangeData} />
  )
}

export default Register