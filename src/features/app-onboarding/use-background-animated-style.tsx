import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { appOnboardingScreens } from '@/features/app-onboarding/view-app-onboarding';

const backgroundImageSize = { width: 1536, height: 1024 };

export const useBackgroundAnimatedStyle = (scrollX: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const maxScrollX = WINDOW_WIDTH * (appOnboardingScreens.length - 1);

    const right = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [650, Math.min(750, backgroundImageSize.width - WINDOW_WIDTH)]
    );

    return { right };
  });
};
