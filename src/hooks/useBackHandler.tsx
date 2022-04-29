import { useCallback, useRef } from 'react';

import { BackHandler, NativeEventSubscription } from 'react-native';

import { useReactNativeEffect } from '@/hooks/useReactNativeEffect';

// This custom hook is used to handle the back button press on Android.
export const useBackHandler = (onBackPressed) => {
  const backHandler = useRef<NativeEventSubscription>();

  const onMount = useCallback(() => {
    // Register the back button event listener.
    backHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBackPressed();
        return true;
      }
    );
  }, [onBackPressed]);

  // Unregister the back button event listener when the component unmounts.
  const onUnmount = useCallback(() => {
    backHandler.current.remove();
  }, []);

  useReactNativeEffect({
    onMount,
    onUnmount,
  });
};
