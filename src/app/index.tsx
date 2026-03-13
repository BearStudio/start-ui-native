import Constants from 'expo-constants';
import { Redirect } from 'expo-router';

import { FullLoader } from '@/components/ui/full-loader';

import { authClient } from '@/features/auth/client';

export default function Index() {
  const session = authClient.useSession();

  if (Constants.expoConfig?.extra?.isStorybook) {
    return <Redirect href="/storybook" />;
  }

  if (session.isPending) {
    return <FullLoader />;
  }

  return (
    <Redirect
      href={
        session.data?.user?.id ? '/(logged)/(tabs)/home' : '/(public)/sign-in'
      }
    />
  );
}
