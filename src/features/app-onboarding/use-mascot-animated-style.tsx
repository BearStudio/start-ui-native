import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { deviceScreen } from '@/constants/device';
import { appOnboardingScreens } from '@/features/app-onboarding/view-app-onboarding';

export const useMascotAnimatedStyle = (scrollX: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const maxScrollX = deviceScreen.width * (appOnboardingScreens.length - 1);

    const leftStart = deviceScreen.width / 3.5;
    const topStart = deviceScreen.height / 2.5;

    const left = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [leftStart, leftStart - 50]
    );

    const top = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [topStart, topStart + 80]
    );

    const rotate = interpolate(scrollX.value, [0, maxScrollX], [2, 10]);

    const scale = interpolate(scrollX.value, [0, maxScrollX], [1, 0.7]);

    return {
      left,
      top,
      transform: [{ rotate: `${rotate}deg` }, { scale }],
    };
  });
};
