import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Account } from '@/modules/account/account.types';
import { apiHooks } from '@/api/api-hooks';

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
  const { data: account, ...rest } = apiHooks.useAccountGet(null, {
    ...config,
    onSuccess: (data) => {
      if (config?.onSuccess) {
        config?.onSuccess(data);
      }
    },
  });

  const isAdmin = !!account?.authorizations?.includes('ADMIN');
  return { account, isAdmin, ...rest };
};
