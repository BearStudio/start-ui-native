import { useLayoutEffect, useMemo, useRef } from 'react';

import {
  SplashScreen,
  useRootNavigationState,
  useRouter,
  useSegments,
} from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import useAuthStore from '@/modules/auth/auth.store';

const useProtectedRoute = () => {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();
  const isAuthentificated = useAuthStore(useShallow((state) => !!state.token));
  const isHydrated = useAuthStore(useShallow((state) => state.isHydrated));
  const currentRouteRef = useRef<'auth' | 'tabs' | 'storybook' | null>(null);
  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!navigationKey || !isHydrated) {
      return;
    }
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
  }, [isAuthentificated, segments, navigationKey, isHydrated]);
};

export default useProtectedRoute;
