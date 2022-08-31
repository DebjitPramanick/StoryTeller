import React, { useContext, createContext, useState } from "react";
import { getUser } from "../../helpers/user.helper";
import { UserDetailsType } from "../../utils/types";

export interface UserContextProps {
  user: UserDetailsType | null,
  saveGlobalUser: (data: any) => void,
  logoutUser: () => void,
  refetchUser: () => void
}

const UserContext = createContext<UserContextProps>({
  user: null,
  saveGlobalUser: (data: any) => { },
  logoutUser: () => { },
  refetchUser: async () => { }
});

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const cacheUserKey = 'story-teller-user';
  const cacheTokenKey = 'story-teller-user-token';
  const cachedUser = JSON.parse(localStorage.getItem(cacheUserKey) || 'null');

  const [user, setUser] = useState<UserDetailsType | null>(cachedUser || null);

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
  }

  const values = {
    user,
    saveGlobalUser,
    logoutUser,
    refetchUser
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
};
