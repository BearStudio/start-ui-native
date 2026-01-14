import { useAsyncStorageDevTools } from '@dev-plugins/async-storage';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { useNavigationContainerRef } from 'expo-router';

import { queryClient } from '@/lib/tanstack-query/config';

export const DevTools = () => {
  useReactQueryDevTools(queryClient);

  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  useAsyncStorageDevTools();

  return <></>;
};
