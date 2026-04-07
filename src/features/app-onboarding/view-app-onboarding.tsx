'use no memo';

import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { ScopedTheme } from 'uniwind';

import { AnimatedStepIndicator } from '@/components/ui/animated-step-indicator';
import { Button } from '@/components/ui/button';

import { deviceScreen } from '@/constants/device';
import { appOnboardingScreens } from '@/features/app-onboarding';
// @ts-expect-error fix image import
import backgroundImage from '@/features/app-onboarding/layout-login-image.jpg';
// @ts-expect-error fix image import
import mascotImage from '@/features/app-onboarding/mascot.png';
import { useOnboardingStore } from '@/features/app-onboarding/store';
import { useBackgroundAnimatedStyle } from '@/features/app-onboarding/use-background-animated-style';
import { useMascotAnimatedStyle } from '@/features/app-onboarding/use-mascot-animated-style';
import { ViewSafeContent } from '@/layout/view-safe-content';

function useScrollHandler() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return { scrollX, scrollHandler };
}

function useExitAnimation(doneOnboarding: () => void) {
  const exitProgress = useSharedValue(0);
  const exitAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(exitProgress.value, [0, 1], [1, 0]),
  }));
  const handleDone = useCallback(() => {
    exitProgress.value = withTiming(1, { duration: 400 }, (finished) => {
      if (finished) {
        scheduleOnRN(doneOnboarding);
      }
    });
  }, [doneOnboarding, exitProgress]);
  return { exitAnimatedStyle, handleDone };
}

export const ViewOnboarding = () => {
  const { t } = useTranslation(['appOnboarding']);
  const insets = useSafeAreaInsets();

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const listRef = useRef<FlatList>(null);

  const { scrollX, scrollHandler } = useScrollHandler();
  const backgroundAnimatedStyle = useBackgroundAnimatedStyle(scrollX);
  const mascotAnimatedStyle = useMascotAnimatedStyle(scrollX);

  const doneOnboarding = useOnboardingStore((state) => state.setDone);
  const { exitAnimatedStyle, handleDone } = useExitAnimation(doneOnboarding);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
      const lastViewableIndex = viewableItems.at(-1)?.index;
      if (lastViewableIndex !== undefined && lastViewableIndex !== null) {
        setCurrentScreenIndex(lastViewableIndex);
      }
    },
    []
  );

  const [viewabilityConfig] = useState({
    viewAreaCoveragePercentThreshold: 30,
  });

  const renderItem = useCallback(
    ({ item }: { item: (typeof appOnboardingScreens)[number] }) => (
      <item.Component />
    ),
    []
  );

  return (
    <ScopedTheme theme="dark">
      <Animated.View style={[{ flex: 1 }, exitAnimatedStyle]}>
        <StatusBar style="light" />
        <Animated.View
          style={[
            {
              width: deviceScreen.width,
              height: deviceScreen.height,
              position: 'absolute',
              zIndex: -1,
            },
            backgroundAnimatedStyle,
          ]}
        >
          <Animated.Image
            source={backgroundImage}
            style={{
              minHeight: deviceScreen.height,
              minWidth: deviceScreen.width,
            }}
          />
        </Animated.View>
        <Animated.Image
          source={mascotImage}
          style={[
            {
              objectFit: 'contain',
              height: deviceScreen.height / 3,
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
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            bounces={false}
            snapToAlignment="center"
            snapToOffsets={appOnboardingScreens.map(
              (_, index) => index * deviceScreen.width
            )}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            onScroll={scrollHandler}
          />
          <View
            className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-8"
            style={{ bottom: insets.bottom }}
          >
            <View className="flex flex-row gap-2">
              {appOnboardingScreens.map((screen, index) => (
                <AnimatedStepIndicator
                  key={screen.name.toString()}
                  isActive={index === currentScreenIndex}
                />
              ))}
            </View>
            <Button
              testID="onboarding-next-button"
              size="lg"
              className="w-full"
              onPress={() => {
                if (currentScreenIndex === appOnboardingScreens.length - 1) {
                  handleDone();
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
          </View>
        </ViewSafeContent>
      </Animated.View>
    </ScopedTheme>
  );
};
