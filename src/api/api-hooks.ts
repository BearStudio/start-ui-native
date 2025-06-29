import { ApiOf, ZodiosPlugin } from '@zodios/core';
import { pluginToken } from '@zodios/plugins';
import { ZodiosHooks } from '@zodios/react';
import { isAxiosError } from 'axios';

import { api } from '@/api/generated-api';
import { authClient } from '@/lib/auth-client';

const logoutUserPlugin: ZodiosPlugin = {
  error: async (_, { method, url }, error) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !(method === 'post' && url === '/accounts/update-email')
    ) {
      authClient.signOut();
    }
    throw error;
  },
};

api.use(logoutUserPlugin);
api.use(
  pluginToken({
    getToken: async () => await authClient.useSession().data?.session.token,
  })
);

export const apiHooks = new ZodiosHooks('apiHooks', api);
export type ApiHooks = ApiOf<typeof api>;
