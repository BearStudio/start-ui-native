import { FC } from 'react';

import { Tabs as RouterTabs } from 'expo-router';
import { Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';

type TabsProps = {
  initialRouteName?: string;
  screens: {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: ExplicitAny; // TODO: update
  }[];
};

export const Tabs: FC<TabsProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { theme } = useTheme();

  const tabBarActiveTintColor = useColorModeValue(
    (theme?.colors?.gray as Dict)?.[800],
    (theme?.colors?.gray as Dict)?.[100]
  );

  const tabBarInactiveTintColor = useColorModeValue(
    (theme?.colors?.gray as Dict)?.[500],
    (theme?.colors?.gray as Dict)?.[400]
  );

  return (
    <RouterTabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: useColorModeValue(
            (theme?.colors?.gray as Dict)?.[50],
            (theme?.colors?.gray as Dict)?.[800]
          ),
          borderTopColor: useColorModeValue(
            (theme?.colors?.gray as Dict)?.[200],
            (theme?.colors?.gray as Dict)?.[900]
          ),
        },
      }}
    >
      {screens.map((screen) => (
        <RouterTabs.Screen
          key={screen.route}
          name={screen.route}
          options={{
            title: screen.title,
            tabBarActiveTintColor,
            tabBarInactiveTintColor,
            tabBarIcon: screen.icon ? TabBarIcon(screen.icon) : undefined,
            ...screen.options,
          }}
        />
      ))}
    </RouterTabs>
  );
};
