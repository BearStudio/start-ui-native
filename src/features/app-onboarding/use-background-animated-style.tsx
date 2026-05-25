import { useWindowDimensions } from 'react-native';
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { appOnboardingScreens } from '@/features/app-onboarding';

const backgroundImageSize = { width: 1536, height: 1024 };

export const useBackgroundAnimatedStyle = (scrollX: SharedValue<number>) => {
  const windows = useWindowDimensions();

  return useAnimatedStyle(() => {
    const maxScrollX = windows.width * (appOnboardingScreens.length - 1);

    const endRight = Math.min(750, backgroundImageSize.width - windows.width);

    const translateX = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [0, -(endRight - 650)]
    );

    return {
      transform: [{ translateX }],
    };
  });
};
