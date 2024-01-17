import {
  Redirect,
  Slot,
  Stack,
  useRootNavigationState,
  useSegments,
} from 'expo-router';

import useAuthStore from '@/modules/auth/auth.store';

export default function AppLayout() {
  const isAuthentificated = useAuthStore((state) => !!state.token);

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isAuthentificated) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)" />;
  }
  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
