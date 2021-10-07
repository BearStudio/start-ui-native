import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useAppState } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';

import { useAccount } from '@/account/account.service';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const useRefetchOnFocus = (refetch = () => {}, canRefetch = true) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  useFocusEffect(() => {
    setIsScreenFocused(true); // when i focus the screen
    return () => setIsScreenFocused(false); // when i quit the screen
  });

  /* the screen still always active in cache so we need to check that the screen is focused in a use effect
  to dispatch the refetch only one time to avoid the infinity loop*/
  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch();
    }
  }, [canRefetch, isScreenFocused, refetch]);
};

export const useScreenFocus = () => {
  const { refetch: refetchAccount } = useAccount();
  const currentAppState = useAppState();
  const previousAppStateRef = useRef(currentAppState);
  useEffect(() => {
    if (
      previousAppStateRef.current !== 'active' &&
      currentAppState === 'active'
    ) {
      refetchAccount();
    }
    previousAppStateRef.current = currentAppState;
  }, [refetchAccount, currentAppState]);
};
