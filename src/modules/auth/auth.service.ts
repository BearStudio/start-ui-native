import { UseMutationOptions } from '@tanstack/react-query';

import { useAuthContext } from './AuthContext';
import { useToast } from 'react-native-ficus-ui';
import { apiHooks } from '@/api/api-hooks';

export const useAuthLoginValidate = (
  token: string,
  config: UseMutationOptions<{ token: string }, unknown, { code: string }> = {}
) => {
  const { updateToken } = useAuthContext();
  const { show } = useToast();
  const mutation = apiHooks.useAuthLoginValidate(
    {
      params: { token },
    },
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.token);
        config?.onSuccess?.(data, ...rest);
      },
      onError: (error: any, ...rest) => {
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
