import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { appOnboardingScreens } from '@/features/app-onboarding/view-app-onboarding';

export const useMascotAnimatedStyle = (scrollX: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const maxScrollX = WINDOW_WIDTH * (appOnboardingScreens.length - 1);

    const leftStart = WINDOW_WIDTH / 3.5;
    const topStart = WINDOW_HEIGHT / 2.5;

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
