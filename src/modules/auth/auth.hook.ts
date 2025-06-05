import { useLayoutEffect, useRef } from 'react';

import { useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { authClient } from '@/lib/auth-client';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

const useProtectedRoute = () => {
  const segments = useSegments();
  const router = useRouter();
  const session = authClient.useSession();
  const isAuthentificated = !!session.data?.user;
  const isHydrated = !session.isPending;
  const currentRouteRef = useRef<'auth' | 'tabs' | 'storybook' | null>(null);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isHydrated) {
      return;
    }
    setTimeout(() => {
      if (process.env.STORYBOOK_ENABLED === 'true') {
        router.replace('/storybook');
        currentRouteRef.current = 'storybook';
      } else if (
        !isAuthentificated &&
        !inAuthGroup &&
        currentRouteRef.current !== 'auth'
      ) {
        router.replace('/onboarding');
        currentRouteRef.current = 'auth';
      } else if (isAuthentificated && currentRouteRef.current !== 'tabs') {
        router.replace('/(tabs)/home');
        currentRouteRef.current = 'tabs';
      }

      SplashScreen.hideAsync();
    }, 100);
  }, [isAuthentificated, segments, isHydrated, router]);
};

export default useProtectedRoute;
