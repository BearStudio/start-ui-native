import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { ComponentProps } from 'react';

export const HapticTab = (props: ComponentProps<typeof PlatformPressable>) => {
  return (
    <PlatformPressable
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
