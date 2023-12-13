import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useAuthContext } from './AuthContext';
import { useToast } from 'react-native-ficus-ui';

export const useLoginValid = (
  config: UseMutationOptions<
    { token: string },
    AxiosError,
    { code: string; token: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  const { show } = useToast();
  const mutation = useMutation(
    ({ code, token }) => axios.post(`/auth/login/validate/${token}`, { code }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.token);
        config?.onSuccess?.(data, ...rest);
      },
      onError: (error, ...rest) => {
        if (error?.response?.status === 401) {
          show({
            text1: 'Wrong email or password. Please try again.',
            type: 'error',
          });
        } else {
          show({
            text1: 'Failed to log in. Please try again.',
            type: 'error',
          });
        }
        config?.onError?.(error, ...rest);
      },
    }
  );
  return { ...mutation, login: mutation.mutate };
};

export const useAuthLogin = (
  config: UseMutationOptions<
    { token: string },
    AxiosError,
    { email: string; language: string }
  > = {}
) => {
  const { show } = useToast();
  const mutation = useMutation(
    ({ email, language }) => axios.post('/auth/login/', { email, language }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        config?.onSuccess?.(data, ...rest);
      },
      onError: (error, ...rest) => {
        if (error) {
          show({
            text1: 'Failed to log in. Please try again.',
            type: 'error',
          });
        }
        config?.onError?.(error, ...rest);
      },
    }
  );
  return { ...mutation, login: mutation.mutate };
};
