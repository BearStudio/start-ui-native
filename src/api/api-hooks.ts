import { ApiOf, ZodiosPlugin } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { isAxiosError } from 'axios';

import { api } from '@/api/generated-api';
import { authClient } from '@/lib/auth-client';
import useSessionStore from '@/modules/auth/stores/auth.store';

const logoutUserPlugin: ZodiosPlugin = {
  error: async (_, { method, url }, error) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !(method === 'post' && url === '/accounts/update-email')
    ) {
      authClient.signOut();
      useSessionStore.getState().reset();
    }
    throw error;
  },
};

const cookieSessionPlugin: ZodiosPlugin = {
  request: async (_api, config: any) => {
    const cookie = await authClient.getCookie();
    if (!cookie) {
      useSessionStore.getState().reset();
    }
    if (cookie) {
      config.headers = {
        ...config.headers,
        Cookie: cookie,
      };
    }
    return config;
  },
};

api.use(logoutUserPlugin);
api.use(cookieSessionPlugin);

export const apiHooks = new ZodiosHooks('apiHooks', api);
export type ApiHooks = ApiOf<typeof api>;

export async function fetchWithSessionCookie(
  url: string,
  options: Partial<RequestInit> = {}
) {
  const cookie = await authClient.getCookie();
  if (!cookie) throw new Error('No session cookie');
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
    Cookie: cookie,
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    ...options,
    headers,
  });
}
