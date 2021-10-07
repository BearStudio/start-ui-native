import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAuthContext } from '@/auth/AuthContext';
import { useToast } from '@/services/utils/toastService';

export const useLogin = (
  config: UseMutationOptions<
    { id_token: string },
    AxiosError<any>,
    { username: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  const { showError } = useToast();
  const mutation = useMutation(
    ({ username, password }) =>
      axios.post('/authenticate', { username, password }),
    {
      ...config,
      onError: (error, ...rest) => {
        if (error.response.status === 401) {
          showError('Wrong email or password. Please try again.');
        } else {
          showError('Failed to log in. Please try again');
        }
        config?.onError?.(error, ...rest);
      },
      onSuccess: (data, ...rest) => {
        updateToken(data.id_token);
        config?.onSuccess?.(data, ...rest);
      },
    }
  );
  return { ...mutation, login: mutation.mutate };
};
