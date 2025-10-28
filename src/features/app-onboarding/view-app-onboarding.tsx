import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  List,
  Stack,
  Text,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppOnboardingScreenTwo,
  AppOnboardingScreenWelcome,
} from '@/features/app-onboarding/app-onboarding-screens';
import { ViewSafeContent } from '@/layout/view-safe-content';

const appOnboardingScreens = [
  { Component: AppOnboardingScreenWelcome },
  { Component: AppOnboardingScreenTwo },
];

export const ViewOnboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const insets = useSafeAreaInsets();

  return (
    <Box w={WINDOW_WIDTH} h={WINDOW_HEIGHT} position="relative">
      <List
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToOffsets={appOnboardingScreens.map(
          (_, index) => index + WINDOW_WIDTH
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems[0]?.index || viewableItems[0]?.index === 0) {
            setCurrentIndex(viewableItems[0]?.index);
          }
        }}
        bounces={false}
        snapToAlignment="center"
        data={appOnboardingScreens}
        renderItem={({ item }) => <item.Component />}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
      />
      <Center
        position="absolute"
        bottom={insets.bottom}
        left={0}
        right={0}
        p={16}
        gap={24}
      >
        <Button full>Continue</Button>
        <HStack gap={4}>
          {appOnboardingScreens.map((_, index) =>
            index === currentIndex ? (
              <Box
                key={index.toString()}
                w={16}
                h={8}
                borderWidth={0.5}
                borderRadius="full"
                borderColor="neutral.100"
                bg="neutral.600"
              />
            ) : (
              <Box
                key={index.toString()}
                w={8}
                h={8}
                borderWidth={0.5}
                borderRadius="full"
                borderColor="neutral.600"
                bg="neutral.100"
              />
            )
          )}
        </HStack>
      </Center>
    </Box>
  );
};
