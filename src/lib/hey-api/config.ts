import { defineConfig } from '@hey-api/openapi-ts';

const openapiUrl: string =
  process.env.EXPO_PUBLIC_OPENAPI_URL ??
  `${process.env.EXPO_PUBLIC_BASE_URL}/api/openapi/app/schema`;

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
