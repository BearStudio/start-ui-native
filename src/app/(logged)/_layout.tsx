import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useThemedStyle } from '@/hooks/use-themed-style';

import { authClient } from '@/features/auth/client';
import { ViewAuthOnboarding } from '@/features/auth/view-auth-onboarding';

export default function LoggedLayout() {
  const router = useRouter();
  const session = authClient.useSession();
  const { t } = useTranslation(['layout']);

  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      router.replace('/(public)/sign-in');
    }
  }, [router, session.data?.user, session.isPending]);

  const themedStyle = useThemedStyle();

  if (!session.data?.user?.name) {
    return <ViewAuthOnboarding />;
  }

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: themedStyle.backgroundColor },
        headerTintColor: themedStyle.color,
        contentStyle: { backgroundColor: themedStyle.sceneBackgroundColor },
      }}
    >
      <Stack.Protected guard={!!session.data?.user?.id}>
        <Stack.Screen
          name="(tabs)"
          options={{ title: t('layout:tabs.books.title') }}
        />
        {/* Add new logged-in View that's not included in tabs here */}
        <Stack.Screen
          name="books/[id]"
          options={(props) => ({
            headerShown: true,
            title: (props.route.params as { title?: string })?.title,
          })}
        />
      </Stack.Protected>
    </Stack>
  );
}
