import appConfig from 'app.config';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

import { env } from '@/env';
import { authClient } from '@/features/auth/client';

const getExpoOrigin = () => Linking.createURL('', { scheme: appConfig.scheme });

export const fetchWithAuth: typeof fetch = async (input, init) => {
  const request = input instanceof Request ? input : new Request(input, init);
  const headers = new Headers(request.headers);
  const cookie = authClient.getCookie();

  if (cookie) {
    headers.set('cookie', cookie);
  }

  if (Platform.OS !== 'web') {
    headers.set('expo-origin', getExpoOrigin());
  }

  return fetch(
    new Request(request, {
      headers,
      credentials: 'omit',
    })
  );
};

export const configureHeyApiClient = () => ({
  baseUrl: env.EXPO_PUBLIC_API_URL,
  fetch: fetchWithAuth,
});
