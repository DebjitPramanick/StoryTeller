import React, { useContext, createContext, useState } from "react";
import { UserDetailsType } from "../../utils/types";

export interface UserContextProps {
  user: UserDetailsType | null,
  saveGlobalUser: (data: any) => void,
  logoutUser: () => void
}

const UserContext = createContext<UserContextProps>({
  user: null,
  saveGlobalUser: (data: any) => {},
  logoutUser: () => {}
});

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const cacheUserKey  = 'story-teller-user';
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

  const logoutUser = () => {
    localStorage.removeItem(cacheUserKey)
    localStorage.removeItem(cacheTokenKey)
  }

  const values = {
    user,
    saveGlobalUser,
    logoutUser
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
};
