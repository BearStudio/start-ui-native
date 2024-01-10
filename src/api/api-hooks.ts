import { ApiOf, ZodiosPlugin } from '@zodios/core';
import { pluginToken } from '@zodios/plugins';
import { ZodiosHooks } from '@zodios/react';
import axios from 'axios';

import { api } from '@/api/generated-api';
import useAuthStore from '@/modules/auth/auth.store';

const logoutUserPlugin: ZodiosPlugin = {
  error: async (_, { method, url }, error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !(method === 'post' && url === '/accounts/update-email')
    ) {
      useAuthStore.getState().logout();
    }
    throw error;
  },
};

api.use(logoutUserPlugin);
api.use(
  pluginToken({
    getToken: async () => useAuthStore.getState().token as string,
  })
);

export const apiHooks = new ZodiosHooks('apiHooks', api);
export type ApiHooks = ApiOf<typeof api>;
