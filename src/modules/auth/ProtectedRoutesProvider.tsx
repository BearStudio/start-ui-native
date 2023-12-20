import useAuthStore from '@/modules/auth/auth.store';
import { useRouter, useRootNavigationState, useSegments } from 'expo-router';
import React, { ReactNode, useEffect } from 'react';

type ProtectedRoutesProviderProps = {
  children: ReactNode;
};

const ProtectedRoutesProvider = ({
  children,
}: ProtectedRoutesProviderProps) => {
  const navigationState = useRootNavigationState();
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => !!state.token);

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments?.[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything
      // segment is not anything in the auth group.
      !isAuthenticated &&
      !inAuthGroup
    ) {
      // Redirect to the onboarding page.
      router.replace('/onboarding');
    } else if (isAuthenticated && (inAuthGroup || segments?.length === 0)) {
      // go to tabs root (authenticated).
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, segments, navigationState?.key]);

  return <>{children}</>;
};
export default ProtectedRoutesProvider;
