import { expoClient } from '@better-auth/expo/client';
import appConfig from 'app.config';
import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

import { env } from '@/env';

export const authClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_AUTH_URL,
  plugins: [
    expoClient({
      scheme: appConfig.scheme,
      storagePrefix: appConfig.scheme,
      storage: SecureStore,
    }),
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        onboardedAt: {
          type: 'date',
        },
      },
    }),
  ],
});
