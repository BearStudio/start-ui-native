import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { FullLoader } from '@/components/full-loader';

import { authClient } from '@/features/auth/client';

export default function Index() {
  const session = authClient.useSession();

  useFocusEffect(
    useCallback(() => {
      if (session.isPending) {
        return;
      }
      router.replace(
        session.data?.session ? '/(logged)/(tabs)/home' : '/(public)/sign-in'
      );
    }, [session.data, session.isPending])
  );

  if (session.isPending) {
    return <FullLoader />;
  }

  return <></>;
}
