import { client } from '@/lib/hey-api/generated/client.gen';

import { authClient } from '@/features/auth/client';

export * as api from './generated/@tanstack/react-query.gen';

client.interceptors.request.use((request) => {
  request.headers.append('Cookie', authClient.getCookie());

  return request;
});
