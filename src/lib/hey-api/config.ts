import { defineConfig } from '@hey-api/openapi-ts';

import { env } from '../../env';

const openapiUrl: string =
  env.EXPO_PUBLIC_OPENAPI_URL ??
  `${env.EXPO_PUBLIC_BASE_URL}/api/openapi/app/schema`;

export default defineConfig({
  input: { path: openapiUrl },
  output: { path: 'src/lib/hey-api/generated' },
  plugins: [
    {
      name: '@tanstack/react-query',
    },
    {
      name: '@hey-api/typescript',
    },
  ],
});
