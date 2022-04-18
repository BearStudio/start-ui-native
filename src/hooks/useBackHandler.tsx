import { useCallback, useRef } from 'react';

import { BackHandler, NativeEventSubscription } from 'react-native';

import { useReactNativeEffect } from '@/hooks/useReactNativeEffect';

export const useBackHandler = (onBackPressed) => {
  const backHandler = useRef<NativeEventSubscription>();

  const onMount = useCallback(() => {
    backHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBackPressed();
        return true;
      }
    );
  }, [onBackPressed]);

  const onUnmount = useCallback(() => {
    backHandler.current.remove();
  }, []);

  useReactNativeEffect({
    onMount,
    onUnmount,
  });
};
