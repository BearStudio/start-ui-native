import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { authClient } from '@/features/auth/client';
import { ViewOnboarding } from '@/features/auth/view-onboarding';

export default function LoggedLayout() {
  const router = useRouter();
  const session = authClient.useSession();

  useEffect(() => {
    if (!session.isPending && !session.data) {
      router.replace('/(public)/sign-in');
    }
  }, [router, session.data, session.isPending]);

  if (!session.data?.user?.name) {
    return <ViewOnboarding />;
  }

  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: 'Books' }} />
      {/* Add new logged-in View that's not included in tabs here */}
      <Stack.Screen name="books/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}
