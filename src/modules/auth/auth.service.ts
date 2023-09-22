import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useAuthContext } from './AuthContext';
import { useToast } from 'react-native-ficus-ui';

export const useLogin = (
  config: UseMutationOptions<
    { id_token: string },
    AxiosError,
    { username: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  const { show } = useToast();
  const mutation = useMutation(
    ({ username, password }) =>
      axios.post('/authenticate', { username, password }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.id_token);
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
