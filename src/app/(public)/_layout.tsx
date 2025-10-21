import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { authClient } from '@/features/auth/client';

export default function PublicLayout() {
  const router = useRouter();
  const session = authClient.useSession();

  useEffect(() => {
    if (!session.isPending && session.data?.user) {
      router.replace('/(logged)/(tabs)/home');
    }
  }, [router, session.data?.user, session.isPending]);

  return (
    <Stack
      initialRouteName="sign-in"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!session.data?.user?.id}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="otp-verification" />
      </Stack.Protected>
    </Stack>
  );
}
