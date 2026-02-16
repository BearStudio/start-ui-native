import { useAsyncStorageDevTools } from '@dev-plugins/async-storage';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient } from '@tanstack/react-query';
import { useNavigationContainerRef } from 'expo-router';

export const DevTools = (props: { queryClient: QueryClient }) => {
  useReactQueryDevTools(props.queryClient);

  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  useAsyncStorageDevTools();

  return <></>;
};
