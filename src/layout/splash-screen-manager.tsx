import { SplashScreen } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';

import { FullLoader } from '@/components/ui/full-loader';

import { authClient } from '@/features/auth/client';

export const SplashScreenManager = (props: PropsWithChildren) => {
  const session = authClient.useSession();

  const isAppReady = !session.isPending;

  // Manage splashscreen hide when all wanted content is loaded
  // For example session, fonts, required queries etc
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <FullLoader />;
  }

  return props.children;
};
