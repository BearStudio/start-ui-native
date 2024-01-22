import { useLayoutEffect, useMemo } from 'react';

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

  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!navigationKey || !isHydrated) {
      return;
    }
    SplashScreen.hideAsync();

    if (!isAuthentificated && !inAuthGroup) {
      router.replace('/onboarding');
    } else if (isAuthentificated && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthentificated, segments, navigationKey, isHydrated]);
};

export default useProtectedRoute;
