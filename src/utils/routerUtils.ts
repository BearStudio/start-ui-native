import { useCallback } from 'react';

import { useFocusEffect, useNavigation } from 'expo-router';

import { useTabBarStyle } from '@/layout/Tabs';

export const useHideTabBar = (isHidden: boolean) => {
  const { getParent } = useNavigation();
  const tabBarStyle = useTabBarStyle();
  useFocusEffect(
    useCallback(() => {
      if (isHidden) {
        getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      }

      return () => {
        getParent()?.setOptions({
          tabBarStyle,
        });
      };
    }, [getParent, isHidden, tabBarStyle])
  );
};

export const useHideHeader = (isHidden: boolean) => {
  const { setOptions } = useNavigation();
  useFocusEffect(
    useCallback(() => {
      if (isHidden) {
        setOptions({
          headerShown: false,
        });
      }

      return () => {
        setOptions({
          headerShown: true,
        });
      };
    }, [setOptions, isHidden])
  );
};
