import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserInfo = {
  nickname: string;
  birth: string;
  gender: string;
  height: string;
  weight: string;
  mainService: string;
};

type UserInfoContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

const defaultUserInfo: UserInfo = {
  nickname: '',
  birth: '',
  gender: '',
  height: '',
  weight: '',
  mainService: '',
};

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
