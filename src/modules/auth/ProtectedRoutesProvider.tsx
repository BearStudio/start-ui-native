import React, { ReactNode, useEffect } from 'react';

import { Redirect, Slot, Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';

import useAuthStore from '@/modules/auth/auth.store';

type ProtectedRoutesProviderProps = {
  children: ReactNode;
};

const ProtectedRoutesProvider = ({
  children,
}: ProtectedRoutesProviderProps) => {
  const navigationState = useRootNavigationState();
  const segments = useSegments();
  const router = useRouter();
  console.log({navigationState})
  const isAuthenticated = useAuthStore((state) => !!state.token);
  if (!isAuthenticated) {
    return <Redirect href="(auth)" />
  }

  return <Stack />

};
export default ProtectedRoutesProvider;
