import React, { useContext, createContext, useState } from "react";

export interface UserContextProps {
  user: any,
  saveGlobalUser: (data: any) => void
}

const UserContext = createContext<UserContextProps>({
  user: null,
  saveGlobalUser: (data: any) => {}
});

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const [user, setUser] = useState<any | null>(null);

  const saveGlobalUser = (data: any) => {
    setUser(data)
  }

  const values = {
    user,
    saveGlobalUser
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
};
