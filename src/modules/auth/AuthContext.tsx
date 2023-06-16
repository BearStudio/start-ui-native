import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { AUTH_TOKEN_KEY } from './auth.constants';

interface AuthContextValue {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  updateToken(token: string | null): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

const updateToken = async (newToken: string | null) => {
  if (!newToken) {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
  }
};

export const useAuthContext = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryCache = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleUpdateToken = useCallback(async (newToken: string) => {
    setToken(newToken);
    await updateToken(newToken);
  }, []);

  const handleLogout = useCallback(async () => {
    queryCache.cancelQueries();
    queryCache.clear();
    setToken(null);
    await updateToken(null);
  }, [queryCache]);

  useEffect(() => {
    (async () => {
      setIsAuthenticating(true);
      const tokenFromStorage = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      setToken(tokenFromStorage);
      setIsAuthenticating(false);
    })();

    const interceptor = axios.interceptors.response.use(
      (r) => r,
      async (error) => {
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.path !== '/api/authenticate'
        ) {
          setIsAuthenticating(true);
          await handleLogout();
          setIsAuthenticating(false);
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [queryCache, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        isAuthenticating,
        updateToken: handleUpdateToken,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
