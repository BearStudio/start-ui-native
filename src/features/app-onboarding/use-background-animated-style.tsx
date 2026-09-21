import { useWindowDimensions } from 'react-native';
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { appOnboardingScreens } from '@/features/app-onboarding';

const backgroundImageSize = { width: 1536, height: 1024 };
const PAN_SCALE = 1.12;

type WindowSize = {
  width: number;
  height: number;
};

export const getBackgroundLayout = (windowSize: WindowSize) => {
  const scale =
    Math.max(
      windowSize.width / backgroundImageSize.width,
      windowSize.height / backgroundImageSize.height
    ) * PAN_SCALE;

  const width = backgroundImageSize.width * scale;
  const height = backgroundImageSize.height * scale;
  const overflowX = Math.max(0, width - windowSize.width);
  const overflowY = Math.max(0, height - windowSize.height);

  return {
    width,
    height,
    top: -overflowY / 2,
    startX: -overflowX * 0.55,
    endX: -overflowX * 0.9,
  };
};

export const useBackgroundAnimatedStyle = (scrollX: SharedValue<number>) => {
  const windows = useWindowDimensions();
  const layout = getBackgroundLayout(windows);

  return useAnimatedStyle(() => {
    const maxScrollX = Math.max(
      windows.width * (appOnboardingScreens.length - 1),
      1
    );

    const translateX = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [layout.startX, layout.endX]
    );

    return {
      transform: [{ translateX }],
    };
  });
};
