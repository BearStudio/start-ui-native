import { api } from '@/api/generated-api';
import { ApiOf, ZodiosPlugin } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { pluginToken } from '@zodios/plugins';
import useAuthStore from '@/modules/auth/auth.store';
import axios from 'axios';

const logoutUserPlugin: ZodiosPlugin = {
  error: async (_, __, error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
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
