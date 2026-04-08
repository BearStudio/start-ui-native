import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { deviceScreen } from '@/constants/device';
import { appOnboardingScreens } from '@/features/app-onboarding';

const backgroundImageSize = { width: 1536, height: 1024 };

export const useBackgroundAnimatedStyle = (scrollX: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const maxScrollX = deviceScreen.width * (appOnboardingScreens.length - 1);

    const right = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [650, Math.min(750, backgroundImageSize.width - deviceScreen.width)]
    );

    return { right };
  });
};
