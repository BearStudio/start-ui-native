import { FC } from 'react';

import { Tabs as RouterTabs } from 'expo-router';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { useDarkMode } from '@/theme/useDarkMode';

type TabsProps = {
  initialRouteName?: string;
  screens: Array<{
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: ExplicitAny; // TODO: update
  }>;
};

export const Tabs: FC<TabsProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();
  return (
    <RouterTabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorModeValue(
            getThemeColor('gray.50'),
            getThemeColor('gray.800')
          ),
          borderTopColor: colorModeValue(
            getThemeColor('gray.200'),
            getThemeColor('gray.900')
          ),
          paddingTop: '1%',
        },
      }}
    >
      {screens.map((screen) => (
        <RouterTabs.Screen
          key={screen.route}
          name={screen.route}
          options={{
            title: screen.title,
            tabBarActiveTintColor: colorModeValue(
              getThemeColor('brand.800'),
              getThemeColor('brand.100')
            ),
            tabBarInactiveTintColor: colorModeValue(
              getThemeColor('gray.500'),
              getThemeColor('gray.400')
            ),
            tabBarIcon: screen.icon ? TabBarIcon(screen.icon) : undefined,
            ...screen.options,
          }}
        />
      ))}
    </RouterTabs>
  );
};
