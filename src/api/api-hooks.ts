import { api } from '@/api/generated-api';
import { ZodiosHooks } from '@zodios/react';

export const apiHooks = new ZodiosHooks('apiHooks', api);
