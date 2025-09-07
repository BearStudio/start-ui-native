import { useLayoutEffect } from 'react';

import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import useSessionStore from '@/modules/auth/stores/auth.store';

const useProtectedRoute = () => {
  const router = useRouter();
  const isAuthentificated = useSessionStore((state) => state.isAuthentificated);
  const isHydrated = useSessionStore((state) => state.isHydrated);
  const isOnboarded = useSessionStore((state) => state.isOnboarded);

  useLayoutEffect(() => {
    if (!isHydrated) {
      return;
    }

    const timeout = setTimeout(() => {
      if (process.env.STORYBOOK_ENABLED === 'true') {
        router.replace('/storybook');
      } else if (!isAuthentificated) {
        router.replace('/(auth)/login');
      } else if (isAuthentificated && !isOnboarded) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(tabs)/home');
      }
      SplashScreen.hideAsync();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [isAuthentificated, isHydrated, isOnboarded, router]);
};

export default useProtectedRoute;
