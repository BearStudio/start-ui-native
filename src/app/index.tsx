import { router, useFocusEffect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';

import { FullLoader } from '@/components/ui/full-loader';

import { authClient } from '@/features/auth/client';

export default function Index() {
  const session = authClient.useSession();

  const isAppReady = !session.isPending;

  // Manage splashscreen hide when all wanted content is loaded
  // For example session, fonts, required queries etc
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  // Manage first app redirection
  useFocusEffect(
    useCallback(() => {
      if (session.isPending) {
        return;
      }
      router.replace(
        session.data?.user?.id ? '/(logged)/(tabs)/home' : '/(public)/sign-in'
      );
    }, [session.data, session.isPending])
  );

  if (session.isPending) {
    return <FullLoader />;
  }

  return <></>;
}
