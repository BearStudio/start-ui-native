import { expoClient } from '@better-auth/expo/client';
import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL,
  plugins: [
    expoClient({
      scheme: 'startuinative',
      storagePrefix: 'startuinative',
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});
