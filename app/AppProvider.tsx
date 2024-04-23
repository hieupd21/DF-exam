'use client';

import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
  initialAccessToken?: string;
};

const AppContext = createContext({
  accessToken: '',
  setAccessToken: (token: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default function AppProvider({
  children,
  initialAccessToken = '',
}: Props) {
  const [accessToken, setAccessToken] = useState(initialAccessToken);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
}
