// lib/auth-client.ts
import { expoClient } from '@better-auth/expo/client';
import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_BASE_URL,

  plugins: [
    inferAdditionalFields({
      user: {
        onboardedAt: {
          type: 'date',
        },
      },
    }),

    expoClient({
      scheme: 'start-ui-native',
      storagePrefix: 'start-ui-native',
      storage: SecureStore,
    }),

    emailOTPClient(),
  ],
  trustedOrigins: [process.env.AUTH_BASE_URL!, 'start-ui-native://*'],
});
