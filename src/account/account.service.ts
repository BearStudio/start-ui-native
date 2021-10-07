import axios, { AxiosError } from 'axios';
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
    AxiosError<any>,
    Pick<Account, 'login' | 'email' | 'langKey'> & { password: string }
  > = {}
) => {
  const mutation = useMutation(
    ({ login, email, password, langKey = 'en' }): Promise<Account> =>
      axios.post('/register', { login, email, password, langKey }),
    {
      ...config,
    }
  );
  return { ...mutation, createAccount: mutation.mutate };
};

export const useUpdateAccount = (
  config: UseMutationOptions<Account, AxiosError<any>, Account> = {}
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (account): Promise<Account> => axios.post('/account', account),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries('account');
        config?.onSuccess?.(...args);
      },
    }
  );
  return { ...mutation, updateAccount: mutation.mutate };
};

export const useResetPasswordInit = (
  config: UseMutationOptions<void, AxiosError<any>, string> = {}
) => {
  const mutation = useMutation(
    (email): Promise<void> =>
      axios.post('/account/reset-password/init', email, {
        headers: { 'Content-Type': 'text/plain' },
      }),
    {
      ...config,
    }
  );
  return { ...mutation, resetPasswordInit: mutation.mutate };
};

export const useResetPasswordFinish = (
  config: UseMutationOptions<
    void,
    AxiosError<any>,
    { key: string; newPassword: string }
  > = {}
) => {
  const mutation = useMutation(
    (payload): Promise<void> =>
      axios.post('/account/reset-password/finish', payload),
    {
      ...config,
    }
  );
  return { ...mutation, resetPasswordFinish: mutation.mutate };
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    AxiosError<any>,
    { currentPassword: string; newPassword: string }
  > = {}
) => {
  const mutation = useMutation(
    (payload): Promise<void> => axios.post('/account/change-password', payload),
    {
      ...config,
    }
  );
  return { ...mutation, updatePassword: mutation.mutate };
};
