import {useMutation, useQuery} from 'react-query';
import {axiosConfig} from '../config/axios';
import {useState, useCallback, useEffect} from 'react';
import {retrieveAuthenticationToken} from './securityService';

export const useUserConnected = () => {
  const [userIsConnected, setUserIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserInformations = useCallback(async () => {
    setIsLoading(true);
    const userToken = await retrieveAuthenticationToken();

    setUserIsConnected(!!userToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserInformations();
  }, [loadUserInformations]);

  return {
    isLoading,
    userIsConnected,
    reloadUserInformations: loadUserInformations,
  };
};

export const useAccount = (config) =>
  useQuery('account', async () => axiosConfig.get('/account'), config);

export const useUpdateAccount = (config) =>
  useMutation((account) => axiosConfig.post('/account', account), {
    ...config,
  });

export const useLogin = (config) =>
  useMutation(
    async ({email, password}) =>
      axiosConfig.post('/authenticate', {
        username: email,
        password,
      }),
    config,
  );

export const useRegister = (config) =>
  useMutation(
    async ({email, password}) =>
      axiosConfig.post('/register', {
        login: email,
        email,
        password,
      }),
    config,
  );

export const useResetPasswordInit = (config) =>
  useMutation(
    (email) =>
      axiosConfig.post('/account/reset-password/init', email, {
        headers: {'Content-Type': 'text/plain'},
      }),
    config,
  );
