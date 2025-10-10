import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: { path: process.env.EXPO_PUBLIC_OPENAPI_URL ?? '' },
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
