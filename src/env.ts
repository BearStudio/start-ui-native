import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'production', 'test']);
const expoOsSchema = z.enum(['ios', 'android', 'web', 'macos', 'windows']);

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    EXPO_PUBLIC_BASE_URL: z.url(),
    EXPO_PUBLIC_AUTH_URL: z.url(),
    EXPO_PUBLIC_OPENAPI_URL: z.url(),
  },
  shared: {
    NODE_ENV: nodeEnvSchema.default('development'),
    EXPO_OS: expoOsSchema.optional(),
  },
  runtimeEnv: {
    EXPO_PUBLIC_BASE_URL: baseUrl,
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
