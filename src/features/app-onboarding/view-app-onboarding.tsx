import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Box, Button, HStack, WINDOW_WIDTH } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppOnboardingScreenFeatures,
  AppOnboardingScreenWelcome,
} from '@/features/app-onboarding/app-onboarding-screens';
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

  return (
    <ViewSafeContent>
      <FlatList
        ref={listRef}
        horizontal
        data={appOnboardingScreens}
        renderItem={({ item }) => <item.Component />}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        snapToAlignment="center"
        snapToOffsets={appOnboardingScreens.map(
          (_, index) => index + WINDOW_WIDTH
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems[0]?.index || viewableItems[0]?.index === 0) {
            setCurrentIndex(viewableItems[0]?.index);
          }
        }}
        getItemLayout={(_, index) => ({
          offset: WINDOW_WIDTH * index,
          length: WINDOW_WIDTH,
          index,
        })}
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
            <Box
              key={screen.name.toString()}
              w={index === currentIndex ? 16 : 8}
              h={8}
              borderRadius="full"
              bg="white"
              opacity={index === currentIndex ? 1 : 0.5}
            />
          ))}
        </HStack>
        {currentIndex === appOnboardingScreens.length - 1 ? (
          <Button full size="xl" onPress={() => doneOnboarding()}>
            {t('appOnboarding:end')}
          </Button>
        ) : (
          <Button
            full
            size="xl"
            onPress={() =>
              listRef.current?.scrollToIndex({ index: currentIndex + 1 })
            }
          >
            {t('appOnboarding:continue')}
          </Button>
        )}
      </Box>
    </ViewSafeContent>
  );
};
