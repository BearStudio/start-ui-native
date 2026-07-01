/* oxlint-disable node/no-process-env */
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'production', 'test']);
const expoOsSchema = z.enum(['ios', 'android', 'web', 'macos', 'windows']);

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    /** Root URL of the backend. */
    EXPO_PUBLIC_BASE_URL: z.url(),
    /** API URL. Defaults to `{BASE_URL}/api/rest` when unset. */
    EXPO_PUBLIC_API_URL: z.url().optional(),
    /** Better Auth API URL. Defaults to `{BASE_URL}/api/auth` when unset. */
    EXPO_PUBLIC_AUTH_URL: z.url().optional(),
    /** OpenAPI schema URL for API client generation. Defaults to `{BASE_URL}/api/openapi/app/schema` when unset. */
    EXPO_PUBLIC_OPENAPI_URL: z.url().optional(),
  },
  shared: {
    /** Node runtime mode. Enables dev-only UI when set to `development`. */
    NODE_ENV: nodeEnvSchema.default('development'),
    /** Current platform (`ios`, `android`, `web`, etc.). Set automatically by Expo. */
    EXPO_OS: expoOsSchema.optional(),
  },
  runtimeEnv: {
    EXPO_PUBLIC_BASE_URL: baseUrl,
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL ??
      (baseUrl ? `${baseUrl}/api/rest` : undefined),
    EXPO_PUBLIC_AUTH_URL:
      process.env.EXPO_PUBLIC_AUTH_URL ??
      (baseUrl ? `${baseUrl}/api/auth` : undefined),
    EXPO_PUBLIC_OPENAPI_URL:
      process.env.EXPO_PUBLIC_OPENAPI_URL ??
      (baseUrl ? `${baseUrl}/api/openapi/app/schema` : undefined),
    NODE_ENV: process.env.NODE_ENV,
    EXPO_OS: process.env.EXPO_OS,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
