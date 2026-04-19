import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'production', 'test']);
const expoOsSchema = z.enum(['ios', 'android', 'web', 'macos', 'windows']);

export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    EXPO_PUBLIC_BASE_URL: z.url(),
    EXPO_PUBLIC_AUTH_URL: z.url().optional(),
    EXPO_PUBLIC_OPENAPI_URL: z.url().optional(),
  },
  shared: {
    NODE_ENV: nodeEnvSchema.default('development'),
    EXPO_OS: expoOsSchema.optional(),
  },
  runtimeEnv: {
    EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
    EXPO_PUBLIC_AUTH_URL: process.env.EXPO_PUBLIC_AUTH_URL,
    EXPO_PUBLIC_OPENAPI_URL: process.env.EXPO_PUBLIC_OPENAPI_URL,
    NODE_ENV: process.env.NODE_ENV,
    EXPO_OS: process.env.EXPO_OS,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
