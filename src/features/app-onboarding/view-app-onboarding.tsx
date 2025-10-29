import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import {
  Box,
  Button,
  HStack,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'react-native-ficus-ui';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedStepIndicator } from '@/components/ui/animated-step-indicator';

import {
  AppOnboardingScreenFeatures,
  AppOnboardingScreenWelcome,
} from '@/features/app-onboarding/app-onboarding-screens';
// @ts-expect-error fix image import
import backgroundImage from '@/features/app-onboarding/layout-login-image.jpg';
// @ts-expect-error TODO fix the import error
import mascotImage from '@/features/app-onboarding/mascot.png';
import { useOnboardingStore } from '@/features/app-onboarding/store';
import { ViewSafeContent } from '@/layout/view-safe-content';

const appOnboardingScreens = [
  { name: 'welcome', Component: AppOnboardingScreenWelcome },
  { name: 'features', Component: AppOnboardingScreenFeatures },
];

const backgroundImageSize = { width: 1536, height: 1024 };

export const ViewOnboarding = () => {
  const { t } = useTranslation(['appOnboarding']);

  const [currentIndex, setCurrentIndex] = useState(0);

  const insets = useSafeAreaInsets();

  const listRef = useRef<FlatList>(null);

  const doneOnboarding = useOnboardingStore((state) => state.setDone);

  // Force light statusBar because of dark background image
  useEffect(() => {
    setStatusBarStyle('light');

    return () => {
      setStatusBarStyle('auto');
    };
  });

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const maxScrollX = WINDOW_WIDTH * (appOnboardingScreens.length - 1);

    const right = interpolate(
      scrollX.value,
      [0, maxScrollX],
      [650, Math.min(750, backgroundImageSize.width - WINDOW_WIDTH)]
    );

    return { right };
  });

  const mascotAnimatedStyle = useAnimatedStyle(() => {
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

  return (
    <>
      <Animated.View
        style={[
          {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            position: 'absolute',
            zIndex: -1,
          },
          backgroundAnimatedStyle,
        ]}
      >
        <Animated.Image source={backgroundImage} />
      </Animated.View>
      <Animated.Image
        source={mascotImage}
        style={[
          {
            objectFit: 'contain',
            height: WINDOW_HEIGHT / 3,
            aspectRatio: 2 / 3,
            position: 'absolute',
          },
          mascotAnimatedStyle,
        ]}
      />
      <ViewSafeContent>
        <Animated.FlatList
          ref={listRef}
          horizontal
          data={appOnboardingScreens}
          renderItem={({ item }) => <item.Component />}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          bounces={false}
          snapToAlignment="start"
          snapToOffsets={appOnboardingScreens.map(
            (_, index) => index + WINDOW_WIDTH
          )}
          onViewableItemsChanged={({ viewableItems }) => {
            const lastViewableIndex = viewableItems.at(-1)?.index;
            if (lastViewableIndex || lastViewableIndex === 0) {
              setCurrentIndex(lastViewableIndex);
            }
          }}
          onScroll={scrollHandler}
        />
        <Box
          position="absolute"
          alignItems="center"
          bottom={insets.bottom}
          left={0}
          right={0}
          p={32}
          gap={16}
        >
          <HStack gap={4}>
            {appOnboardingScreens.map((screen, index) => (
              <AnimatedStepIndicator
                key={screen.name.toString()}
                isActive={index === currentIndex}
              />
            ))}
          </HStack>
          <Button
            full
            bg="white"
            color="neutral.900"
            size="lg"
            onPress={() => {
              if (currentIndex === appOnboardingScreens.length - 1) {
                doneOnboarding();
              } else {
                listRef.current?.scrollToIndex({ index: currentIndex + 1 });
              }
            }}
          >
            {t(
              `appOnboarding:${currentIndex === appOnboardingScreens.length - 1 ? 'end' : 'continue'}`
            )}
          </Button>
        </Box>
      </ViewSafeContent>
    </>
  );
};
