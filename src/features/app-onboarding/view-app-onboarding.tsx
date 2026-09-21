'use no memo';

import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  type FlatListProps,
  useWindowDimensions,
} from 'react-native';
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

import { appOnboardingScreens } from '@/features/app-onboarding';
// @ts-expect-error fix image import
import backgroundImage from '@/features/app-onboarding/layout-login-image.jpg';
// @ts-expect-error fix image import
import mascotImage from '@/features/app-onboarding/mascot.png';
import { useOnboardingStore } from '@/features/app-onboarding/store';
import {
  getBackgroundLayout,
  useBackgroundAnimatedStyle,
} from '@/features/app-onboarding/use-background-animated-style';
import {
  getMascotLayoutStyle,
  useMascotAnimatedStyle,
} from '@/features/app-onboarding/use-mascot-animated-style';

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
  const windows = useWindowDimensions();
  const backgroundLayout = getBackgroundLayout(windows);

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const currentScreenIndexRef = useRef(0);

  const listRef = useRef<FlatList>(null);

  const { scrollX, scrollHandler } = useScrollHandler();
  const backgroundAnimatedStyle = useBackgroundAnimatedStyle(scrollX);
  const mascotAnimatedStyle = useMascotAnimatedStyle(scrollX, windows);

  const doneOnboarding = useOnboardingStore((state) => state.setDone);
  const { exitAnimatedStyle, handleDone } = useExitAnimation(doneOnboarding);

  useEffect(() => {
    const offset = currentScreenIndexRef.current * windows.width;
    scrollX.value = offset;
    listRef.current?.scrollToOffset({ offset, animated: false });
  }, [scrollX, windows.width]);

  const onViewableItemsChanged = useCallback<
    NonNullable<
      FlatListProps<
        (typeof appOnboardingScreens)[number]
      >['onViewableItemsChanged']
    >
  >(({ viewableItems }) => {
    const lastViewableIndex = viewableItems.at(-1)?.index;
    if (lastViewableIndex != null) {
      currentScreenIndexRef.current = lastViewableIndex;
      setCurrentScreenIndex(lastViewableIndex);
    }
  }, []);

  const [viewabilityConfig] = useState({
    viewAreaCoveragePercentThreshold: 30,
  });

  const renderItem = useCallback(
    ({ item }: { item: (typeof appOnboardingScreens)[number] }) => (
      <item.Component />
    ),
    []
  );

  const getItemLayout = useCallback<
    NonNullable<
      FlatListProps<(typeof appOnboardingScreens)[number]>['getItemLayout']
    >
  >(
    (_data, index) => ({
      length: windows.width,
      offset: windows.width * index,
      index,
    }),
    [windows.width]
  );

  return (
    <ScopedTheme theme="dark">
      <Animated.View
        style={[{ flex: 1, overflow: 'hidden' }, exitAnimatedStyle]}
      >
        <StatusBar style="light" />
        <Animated.Image
          source={backgroundImage}
          style={[
            {
              position: 'absolute' as const,
              zIndex: -1,
              width: backgroundLayout.width,
              height: backgroundLayout.height,
              top: backgroundLayout.top,
              left: 0,
            },
            backgroundAnimatedStyle,
          ]}
        />
        <Animated.Image
          source={mascotImage}
          style={[getMascotLayoutStyle(windows), mascotAnimatedStyle]}
        />
        <View className="flex-1">
          <Animated.FlatList
            ref={listRef}
            horizontal
            data={appOnboardingScreens}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            bounces={false}
            pagingEnabled
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            onScroll={scrollHandler}
          />
          <View
            className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4"
            style={{
              bottom: insets.bottom,
              paddingLeft: 32 + insets.left,
              paddingRight: 32 + insets.right,
              paddingBottom: 32,
            }}
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
              size="lg"
              className="w-full max-w-100"
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
        </View>
      </Animated.View>
    </ScopedTheme>
  );
};
