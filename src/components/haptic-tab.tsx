import * as Haptics from 'expo-haptics';
import { PlatformPressable } from 'expo-router/react-navigation';
import { ComponentProps } from 'react';

export const HapticTab = (props: ComponentProps<typeof PlatformPressable>) => {
  return (
    <PlatformPressable
      accessibilityRole="tab"
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
};
