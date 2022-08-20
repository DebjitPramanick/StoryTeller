import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { loginUser } from '../../helpers/auth.helper'
import LoginUI from './LoginUI'

export interface LoginDataType {
  name_email: string,
  password: string
}

const initialData: LoginDataType = {
  name_email: '',
  password: ''
}

const Login: React.FC<any> = () => {

  const {saveGlobalUser, user} = useUser();

  const [data, setData] = useState<LoginDataType>(initialData)

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const hasEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.name_email)
      const payload = hasEmail ? {email: data.name_email, password: data.password} 
      : {username: data.name_email, password: data.password};
      const res = await loginUser(payload);
      saveGlobalUser(res.data);
      window.location.href = "/"
    } catch (err: any) {
      console.log(err)
      alert(err)
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  if(user) return <Navigate to={"/"}/>

  return (
    <LoginUI
      data={data}
      handleChangeData={handleChangeData}
      handleLogin={handleLogin}
    />
  )
}

export default Login