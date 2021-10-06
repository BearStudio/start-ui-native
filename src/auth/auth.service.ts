import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAuthContext } from '@/auth/AuthContext';

export const useLogin = (
  config: UseMutationOptions<
    any,
    unknown,
    { username: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();
  return useMutation(
    ({ username, password }) =>
      axios.post('/authenticate', { username, password }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.id_token);
        if (config.onSuccess) {
          config.onSuccess(data, ...rest);
        }
      },
    }
  );
};
