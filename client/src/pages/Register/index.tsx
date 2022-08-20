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
      const res = await registerUser(data);
      console.log(res.data)
    } catch (err) {
      alert(data)
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