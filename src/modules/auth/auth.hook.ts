import { useLayoutEffect, useMemo, useRef } from 'react';

import { useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useShallow } from 'zustand/react/shallow';

import useAuthStore from '@/modules/auth/auth.store';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

const useProtectedRoute = () => {
  const segments = useSegments();
  const router = useRouter();
  const isAuthentificated = useAuthStore(useShallow((state) => !!state.token));
  const isHydrated = useAuthStore(useShallow((state) => state.isHydrated));
  const currentRouteRef = useRef<'auth' | 'tabs' | 'storybook' | null>(null);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isHydrated) {
      return;
    }
    setTimeout(() => {
      SplashScreen.hideAsync();

      if (process.env.STORYBOOK_ENABLED === 'true') {
        router.replace('/storybook');
        currentRouteRef.current !== 'storybook';
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
    }, 100);
  }, [isAuthentificated, segments, isHydrated]);
};

export default useProtectedRoute;
