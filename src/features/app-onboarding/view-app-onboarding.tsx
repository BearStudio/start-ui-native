import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
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
  useAnimatedScrollHandler,
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
// @ts-expect-error fix image import
import mascotImage from '@/features/app-onboarding/mascot.png';
import { useOnboardingStore } from '@/features/app-onboarding/store';
import { useBackgroundAnimatedStyle } from '@/features/app-onboarding/use-background-animated-style';
import { useMascotAnimatedStyle } from '@/features/app-onboarding/use-mascot-animated-style';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const appOnboardingScreens = [
  { name: 'welcome', Component: AppOnboardingScreenWelcome },
  { name: 'features', Component: AppOnboardingScreenFeatures },
];

export const ViewOnboarding = () => {
  const { t } = useTranslation(['appOnboarding']);
  const insets = useSafeAreaInsets();

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const listRef = useRef<FlatList>(null);

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const backgroundAnimatedStyle = useBackgroundAnimatedStyle(scrollX);
  const mascotAnimatedStyle = useMascotAnimatedStyle(scrollX);

  const doneOnboarding = useOnboardingStore((state) => state.setDone);

  return (
    <>
      <StatusBar style="light" />
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
        <Animated.Image
          source={backgroundImage}
          style={{ minHeight: WINDOW_HEIGHT, minWidth: WINDOW_WIDTH }}
        />
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
          snapToAlignment="center"
          snapToOffsets={appOnboardingScreens.map(
            (_, index) => index * WINDOW_WIDTH
          )}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 30,
          }}
          onViewableItemsChanged={({ viewableItems }) => {
            const lastViewableIndex = viewableItems.at(-1)?.index;
            if (lastViewableIndex || lastViewableIndex === 0) {
              setCurrentScreenIndex(lastViewableIndex);
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
                isActive={index === currentScreenIndex}
              />
            ))}
          </HStack>
          <Button
            full
            bg="white"
            color="neutral.900"
            size="lg"
            onPress={() => {
              if (currentScreenIndex === appOnboardingScreens.length - 1) {
                doneOnboarding();
              } else {
                listRef.current?.scrollToIndex({
                  index: currentScreenIndex + 1,
                });
              }
            }}
          >
            {t(
              `appOnboarding:${currentScreenIndex === appOnboardingScreens.length - 1 ? 'end' : 'continue'}`
            )}
          </Button>
        </Box>
      </ViewSafeContent>
    </>
  );
};
