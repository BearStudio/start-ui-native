import { api } from '@/api/generated-api';
import { ApiOf } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

export const apiHooks = new ZodiosHooks('apiHooks', api);
export type ApiHooks = ApiOf<typeof api>;


