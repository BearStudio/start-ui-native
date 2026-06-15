import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { appOnboardingScreens } from '@/features/app-onboarding';

type DeviceScreen = {
  width: number;
  height: number;
};

export const useMascotAnimatedStyle = (
  scrollX: SharedValue<number>,
  deviceScreen: DeviceScreen
) => {
  return useAnimatedStyle(() => {
    const maxScrollX = deviceScreen.width * (appOnboardingScreens.length - 1);

    const translateX = interpolate(scrollX.value, [0, maxScrollX], [0, -50]);

    const translateY = interpolate(scrollX.value, [0, maxScrollX], [0, 80]);

    const rotate = interpolate(scrollX.value, [0, maxScrollX], [2, 10]);

    const scale = interpolate(scrollX.value, [0, maxScrollX], [1, 0.7]);

    return {
      transform: [
        { translateX },
        { translateY },
        { rotate: `${rotate}deg` },
        { scale },
      ],
    };
  });
};

export const getMascotLayoutStyle = (deviceScreen: DeviceScreen) => ({
  objectFit: 'contain' as const,
  height: deviceScreen.height / 3,
  aspectRatio: 2 / 3,
  position: 'absolute' as const,
  left: deviceScreen.width / 3.5,
  top: deviceScreen.height / 2.5,
});
