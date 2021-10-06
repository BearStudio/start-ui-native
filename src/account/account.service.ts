import axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { Account } from '@/account/account.types';
import { useAuthContext } from '@/auth/AuthContext';

export const useAccount = (config: UseQueryOptions<Account> = {}) => {
  const { isAuthenticated, isAuthenticating } = useAuthContext();
  const { data: account, ...rest } = useQuery(
    ['account'],
    (): Promise<Account> => axios.get('/account'),
    {
      ...config,
      enabled: config?.enabled || (isAuthenticated && !isAuthenticating),
    }
  );
  const isAdmin = !!account?.authorities?.includes('ROLE_ADMIN');
  return { account, isAdmin, ...rest };
};

export const useCreateAccount = (
  config: UseMutationOptions<
    Account,
    unknown,
    Pick<Account, 'login' | 'email' | 'langKey'> & { password: string }
  > = {}
) => {
  return useMutation(
    ({ login, email, password, langKey = 'en' }): Promise<Account> =>
      axios.post('/register', { login, email, password, langKey }),
    {
      ...config,
    }
  );
};

export const useUpdateAccount = (
  config: UseMutationOptions<Account, unknown, Account> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (account): Promise<Account> => axios.post('/account', account),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries('account');
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useResetPasswordInit = (
  config: UseMutationOptions<void, unknown, string> = {}
) => {
  return useMutation(
    (email): Promise<void> =>
      axios.post('/account/reset-password/init', email, {
        headers: { 'Content-Type': 'text/plain' },
      }),
    {
      ...config,
    }
  );
};

export const useResetPasswordFinish = (
  config: UseMutationOptions<
    void,
    unknown,
    { key: string; newPassword: string }
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> =>
      axios.post('/account/reset-password/finish', payload),
    {
      ...config,
    }
  );
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    unknown,
    { currentPassword: string; newPassword: string }
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> => axios.post('/account/change-password', payload),
    {
      ...config,
    }
  );
};
