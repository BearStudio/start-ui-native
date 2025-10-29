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
import { useOnboardingStore } from '@/features/app-onboarding/store';
import { ViewSafeContent } from '@/layout/view-safe-content';

const appOnboardingScreens = [
  { name: 'welcome', Component: AppOnboardingScreenWelcome },
  { name: 'features', Component: AppOnboardingScreenFeatures },
];

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

  const animatedImageStyles = useAnimatedStyle(() => {
    const right = interpolate(
      scrollX.value,
      [0, WINDOW_WIDTH * (appOnboardingScreens.length - 1)],
      [700, 800]
    );

    return { right };
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
          animatedImageStyles,
        ]}
      >
        <Animated.Image source={backgroundImage} />
      </Animated.View>
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
            variant="@secondary"
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
