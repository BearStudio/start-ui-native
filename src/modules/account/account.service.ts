import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { ZodiosBodyByAlias, ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks, apiHooks } from '@/api/api-hooks';

type Account = ZodiosBodyByAlias<ApiHooks, 'accountGet'>;
type AccountResponse = ZodiosResponseByAlias<ApiHooks, 'accountGet'>;

export const useAccount = (
  config: UseQueryOptions<Account, ExplicitAny, AccountResponse> = {}
) => {
  const { data: account, ...rest } = apiHooks.useAccountGet({}, config);

  const isAdmin = !!account?.authorizations?.includes('ADMIN');
  return { account, isAdmin, ...rest };
};

type RegisterRequest = ZodiosBodyByAlias<ApiHooks, 'authRegister'>;
type RegisterResponse = ZodiosResponseByAlias<ApiHooks, 'authRegister'>;

export const useAuthRegister = (
  config: UseMutationOptions<
    RegisterResponse,
    ExplicitAny,
    RegisterRequest
  > = {}
) => {
  const { mutate: createAccount, isLoading } = apiHooks.useAuthRegister(
    {},
    config
  );

  return { createAccount, isLoading };
};
