import Constants from 'expo-constants';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { FullLoader } from '@/components/ui/full-loader';

import { useOnboardingStore } from '@/features/app-onboarding/store';
import { ViewOnboarding } from '@/features/app-onboarding/view-app-onboarding';
import { authClient } from '@/features/auth/client';

export default function Index() {
  const session = authClient.useSession();
  const isOnboarded = useOnboardingStore((state) => state.done);

  console.log({ isOnboarded });

  // Manage first app redirection
  useFocusEffect(
    useCallback(() => {
      if (!isOnboarded || session.isPending) {
        return;
      }
      router.replace(
        session.data?.user?.id ? '/(logged)/(tabs)/home' : '/(public)/sign-in'
      );
    }, [session.data, session.isPending, isOnboarded])
  );

  if (!isOnboarded) {
    return <ViewOnboarding />;
  }

  if (Constants.expoConfig?.extra?.isStorybook) {
    return <Redirect href="/storybook" />;
  }

  if (session.isPending) {
    return <FullLoader />;
  }

  return <></>;
}
