import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { Account } from '@/modules/account/account.types';

export const accountKeys = createQueryKeys('accountService', {
  account: null,
});
type AccountKeys = inferQueryKeys<typeof accountKeys>;

export const useAccount = (
  config: UseQueryOptions<
    Account,
    AxiosError,
    Account,
    AccountKeys['account']['queryKey']
  > = {}
) => {
  const { data: account, ...rest } = useQuery(
    accountKeys.account.queryKey,
    (): Promise<Account> => Axios.get('/accounts/me'),
    {
      onSuccess: (data) => {
        if (config?.onSuccess) {
          config?.onSuccess(data);
        }
      },
      ...config,
    }
  );
  const isAdmin = !!account?.authorizations?.includes('ADMIN');
  return { account, isAdmin, ...rest };
};

type AccountError = {
  title: string;
  errorKey: 'userexists' | 'emailexists';
};

export const useCreateAccount = (
  config: UseMutationOptions<
    Account,
    AxiosError<AccountError>,
    Pick<Account, 'email' | 'name'>
  > = {}
) => {
  return useMutation(
    ({ email, name }): Promise<Account> =>
      Axios.post('/auth/register', { email, name, language: 'en' }),
    {
      ...config,
    }
  );
};

export const useUpdatePassword = (
  config: UseMutationOptions<
    void,
    AxiosError<TODO>,
    { currentPassword: string; newPassword: string }
  > = {}
) => {
  return useMutation(
    (payload): Promise<void> => Axios.post('/account/change-password', payload),
    {
      ...config,
    }
  );
};
