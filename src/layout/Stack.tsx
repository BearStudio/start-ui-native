import { FC } from 'react';

import { Stack as RouterStack } from 'expo-router';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { useDarkMode } from '@/theme/useDarkMode';

type StackProps = {
  initialRouteName?: string;
  screens: Array<{
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: ExplicitAny; // TODO: update
  }>;
};

export const Stack: FC<StackProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();

  return (
    <RouterStack
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: colorModeValue(
            getThemeColor('gray.100'),
            getThemeColor('gray.800')
          ),
        },
        headerTintColor: colorModeValue(
          getThemeColor('gray.800'),
          getThemeColor('gray.100')
        ),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {screens.map((screen) => (
        <RouterStack.Screen
          key={screen.route}
          name={screen.route}
          options={{
            title: screen.title,
            tabBarIcon: screen.icon ? TabBarIcon(screen.icon) : undefined,
            contentStyle: {
              backgroundColor: colorModeValue(
                getThemeColor('gray.100'),
                getThemeColor('gray.800')
              ),
            },
            ...screen.options,
          }}
        />
      ))}
    </RouterStack>
  );
};
