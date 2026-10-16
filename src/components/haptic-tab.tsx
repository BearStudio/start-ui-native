import * as Haptics from 'expo-haptics';
import type { BottomTabBarButtonProps } from 'expo-router/tabs';
import * as React from 'react';
import { Pressable } from 'react-native';

import { env } from '@/env';

export const HapticTab = ({
  ref,
  onPressIn,
  pressColor: _pressColor,
  pressOpacity: _pressOpacity,
  hoverEffect: _hoverEffect,
  ...props
}: BottomTabBarButtonProps) => {
  return (
    <Pressable
      ref={ref as React.Ref<React.ComponentRef<typeof Pressable>>}
      accessibilityRole="tab"
      {...props}
      onPressIn={(ev) => {
        if (env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(ev);
      }}
    />
  );
};
