import { UseMutationOptions } from '@tanstack/react-query';
import { ZodiosBodyByAlias, ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks, apiHooks } from '@/api/api-hooks';

type AccountUpdateRequest = ZodiosBodyByAlias<ApiHooks, 'accountUpdateInfo'>;
type AccountUpdateResponse = ZodiosResponseByAlias<
  ApiHooks,
  'accountUpdateInfo'
>;

export const useAccountUpdate = (
  config: UseMutationOptions<
    AccountUpdateResponse,
    ExplicitAny,
    AccountUpdateRequest
  > = {}
) => {
  const { mutate: updateAccount, isLoading } = apiHooks.useAccountUpdateInfo(
    {},
    config
  );

  return { updateAccount, isLoading };
};

type AccountUpdateEmailRequest = ZodiosBodyByAlias<
  ApiHooks,
  'accountUpdateInfo'
>;
type AccountUpdateEmailResponse = ZodiosResponseByAlias<
  ApiHooks,
  'accountUpdateInfo'
>;

export const useAccountUpdateEmail = (
  config: UseMutationOptions<
    AccountUpdateEmailResponse,
    ExplicitAny,
    AccountUpdateEmailRequest
  > = {}
) => {
  const { mutate: updateAccountEmail, isLoading } =
    apiHooks.useAccountUpdateInfo({}, config);

  return { updateAccountEmail, isLoading };
};
