import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { ZodiosBodyByAlias, ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks, apiHooks } from '@/api/api-hooks';

import useAuthStore from '../auth/auth.store';

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

type RegisterValidateRequest = ZodiosBodyByAlias<
  ApiHooks,
  'authRegisterValidate'
>;
type RegisterValidateResponse = ZodiosResponseByAlias<
  ApiHooks,
  'authRegisterValidate'
>;

export const useAuthRegisterValidate = (
  token: string,
  config: UseMutationOptions<
    RegisterValidateResponse,
    ExplicitAny,
    RegisterValidateRequest
  > = {}
) => {
  const updateToken = useAuthStore((state) => state.setToken);
  const mutation = apiHooks.useAuthRegisterValidate(
    {
      params: { token },
    },
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.token);
        config?.onSuccess?.(data, ...rest);
      },
      onError: (error: ExplicitAny, ...rest) => {
        config?.onError?.(error, ...rest);
      },
    }
  );

  return { ...mutation, accountValidate: mutation.mutate };
};

type AccountUpdateRequest = ZodiosBodyByAlias<ApiHooks, 'accountUpdate'>;
type AccountUpdateResponse = ZodiosResponseByAlias<ApiHooks, 'accountUpdate'>;

export const useAccountUpdate = (
  config: UseMutationOptions<
    AccountUpdateResponse,
    ExplicitAny,
    AccountUpdateRequest
  > = {}
) => {
  const { mutate: updateAccount, isLoading } = apiHooks.useAccountUpdate(
    {},
    config
  );

  return { updateAccount, isLoading };
};

type AccountUpdateEmailRequest = ZodiosBodyByAlias<
  ApiHooks,
  'accountUpdateEmail'
>;
type AccountUpdateEmailResponse = ZodiosResponseByAlias<
  ApiHooks,
  'accountUpdateEmail'
>;

export const useAccountUpdateEmail = (
  config: UseMutationOptions<
    AccountUpdateEmailResponse,
    ExplicitAny,
    AccountUpdateEmailRequest
  > = {}
) => {
  const { mutate: updateAccountEmail, isLoading } =
    apiHooks.useAccountUpdateEmail({}, config);

  return { updateAccountEmail, isLoading };
};

type AccountUpdateEmailValidateRequest = ZodiosBodyByAlias<
  ApiHooks,
  'accountUpdateEmailValidate'
>;
type AccountUpdateEmailValidateResponse = ZodiosResponseByAlias<
  ApiHooks,
  'accountUpdateEmailValidate'
>;

export const useAccountUpdateEmailValidate = (
  config: UseMutationOptions<
    AccountUpdateEmailValidateResponse,
    ExplicitAny,
    AccountUpdateEmailValidateRequest
  > = {}
) => {
  const { mutate: updateAccountEmailValidate, isLoading } =
    apiHooks.useAccountUpdateEmailValidate({}, config);

  return { updateAccountEmailValidate, isLoading };
};
