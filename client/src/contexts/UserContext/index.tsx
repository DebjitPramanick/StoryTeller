import React, { useContext, createContext, useState } from "react";
import { getUser } from "../../helpers/user.helper";
import { GlobalUserType } from "../../utils/types";

export interface UserContextProps {
  user: GlobalUserType,
  saveGlobalUser: (data: any) => void,
  logoutUser: () => void,
  refetchUser: () => void,
  isLoggedIn: boolean
}

const initialUser: GlobalUserType = {
  _id: '',
  name: '',
  email: "",
  username: "",
  password: "",
  bio: "",
  avatar: "",
  country: "",
  dob: "",
  gender: "M",
  created_at: ""
}

const UserContext = createContext<UserContextProps>({
  user: initialUser,
  saveGlobalUser: (data: any) => { },
  logoutUser: () => { },
  refetchUser: async () => { },
  isLoggedIn: false
});

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const cacheUserKey = 'story-teller-user';
  const cacheTokenKey = 'story-teller-user-token';
  const cachedUser = JSON.parse(localStorage.getItem(cacheUserKey) || 'null');

  const [user, setUser] = useState<GlobalUserType>(cachedUser || initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(cachedUser || false);

  const saveGlobalUser = (data: any) => {
    const userData = data.user;
    const token = data.token;
    setUser(userData)
    localStorage.setItem(cacheUserKey, JSON.stringify(userData))
    localStorage.setItem(cacheTokenKey, token)
  }
  

  const refetchUser = async () => {
    try {
      if (user && user._id) {
        const res = await getUser(user._id);
        const userData = res.data;
        setUser(userData)
        localStorage.setItem(cacheUserKey, JSON.stringify(userData))
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem(cacheUserKey)
    localStorage.removeItem(cacheTokenKey)
    setIsLoggedIn(false);
  }

  const values = {
    user,
    saveGlobalUser,
    logoutUser,
    refetchUser,
    isLoggedIn
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
};
