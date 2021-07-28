import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
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
  useQuery('account', async () => axios.get('/account'), config);

export const useUpdateAccount = (config) =>
  useMutation((account) => axios.post('/account', account), {
    ...config,
  });

export const useLogin = (config) =>
  useMutation(
    async ({email, password}) =>
      axios.post('/authenticate', {
        username: email,
        password,
      }),
    config,
  );

export const useRegister = (config) =>
  useMutation(
    async ({email, password}) =>
      axios.post('/register', {
        login: email,
        email,
        password,
      }),
    config,
  );

export const useResetPasswordInit = (config) =>
  useMutation(
    (email) =>
      axios.post('/account/reset-password/init', email, {
        headers: {'Content-Type': 'text/plain'},
      }),
    config,
  );
