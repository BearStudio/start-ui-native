import { expoClient } from '@better-auth/expo/client';
import appConfig from 'app.config';
import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

const authBaseURL: string =
  process.env.EXPO_PUBLIC_AUTH_URL ??
  `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
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
  trustedOrigins: [authBaseURL, `${appConfig.scheme}://*`],
});
