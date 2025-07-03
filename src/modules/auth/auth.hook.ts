import { useEffect, useLayoutEffect, useState } from 'react';

import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { authClient } from '@/lib/auth-client';

const useProtectedRoute = () => {
  const router = useRouter();
  const session = authClient.useSession();
  const isPendingSession = !session.isPending;
  const isAuthentificated = !!session.data?.user;
  const isOnboarded = !!session.data?.user.onboardedAt;
  const [isHydrated, setIsHydrated] = useState(false);
  // isHydrate should return false on the first pending and its became false but the next ispending isHydrate should always true is like the diff between isLoading and isFetching in react query
  useEffect(() => {
    if (!isPendingSession) {
      setIsHydrated(true);
    }
  }, [isPendingSession]);

  useLayoutEffect(() => {
    if (!isHydrated) {
      return;
    }
    const timeout = setTimeout(() => {
      if (process.env.STORYBOOK_ENABLED === 'true') {
        router.replace('/storybook');
      } else if (!isAuthentificated) {
        router.replace('/(auth)/welcome');
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
