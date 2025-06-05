import { expoClient } from '@better-auth/expo/client';
import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: 'https://start-ui-web-restart.vercel.app/api/auth',
  plugins: [
    expoClient({
      scheme: 'start-ui-native',
      storagePrefix: 'start-ui-native',
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});
