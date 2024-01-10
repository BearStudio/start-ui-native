import { UseMutationOptions } from '@tanstack/react-query';
import { ZodiosBodyByAlias, ZodiosResponseByAlias } from '@zodios/core';

import { ApiHooks, apiHooks } from '@/api/api-hooks';
import useAuthStore from '@/modules/auth/auth.store';

// Define the types for your request and response
type ValidateLoginRequest = ZodiosBodyByAlias<ApiHooks, 'authLoginValidate'>;
type ValidateLoginResponse = ZodiosResponseByAlias<
  ApiHooks,
  'authLoginValidate'
>;

export const useAuthLoginValidate = (
  token: string,
  config: UseMutationOptions<
    ValidateLoginResponse,
    unknown,
    ValidateLoginRequest
  > = {}
) => {
  const updateToken = useAuthStore((state) => state.setToken);
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
      onError: (error: ExplicitAny, ...rest) => {
        config?.onError?.(error, ...rest);
      },
    }
  );

  return { ...mutation, login: mutation.mutate };
};

type AuthLoginRequest = ZodiosBodyByAlias<ApiHooks, 'authLogin'>;
type AuthLoginResponse = ZodiosResponseByAlias<ApiHooks, 'authLogin'>;

export const useAuthLogin = (
  options: UseMutationOptions<AuthLoginResponse, unknown, AuthLoginRequest> = {}
) => {
  const { mutate: authLogin, isLoading: isLoadingAuth } = apiHooks.useAuthLogin(
    {},
    options
  );

  return { authLogin, isLoadingAuth };
};
