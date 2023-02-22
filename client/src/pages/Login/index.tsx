import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { loginUser } from '../../helpers/auth.helper'
import { popupMessage } from '../../helpers/common.helper'
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

  const {saveGlobalUser, isLoggedIn} = useUser();

  const [data, setData] = useState<LoginDataType>(initialData)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const hasEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.name_email)
      const payload = hasEmail ? {email: data.name_email, password: data.password} 
      : {username: data.name_email, password: data.password};
      const res = await loginUser(payload);
      saveGlobalUser(res.data);
      setLoading(false);
      window.location.href = "/"
    } catch (err: any) {
      popupMessage('error', err.message);
      setLoading(false);
    }
  }

  const handleChangeData = (field: string, value: string) => {
    setData({ ...data, [field]: value })
  }

  if(isLoggedIn) return <Navigate to={"/"}/>

  return (
    <LoginUI
      data={data}
      handleChangeData={handleChangeData}
      handleLogin={handleLogin}
      loading={loading}
    />
  )
}

export default Login