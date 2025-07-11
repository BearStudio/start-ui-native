import { FC } from 'react';

import { Stack as RouterStack } from 'expo-router';
import { Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';

type StackProps = {
  initialRouteName?: string;
  screens: {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: ExplicitAny; // TODO: update
  }[];
};

export const Stack: FC<StackProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { theme } = useTheme();

  const backgroundColor = useColorModeValue(
    (theme?.colors?.gray as Dict)?.[100],
    (theme?.colors?.gray as Dict)?.[800]
  );

  return (
    <RouterStack
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor: useColorModeValue(
          (theme?.colors?.gray as Dict)?.[800],
          (theme?.colors?.gray as Dict)?.[100]
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
              backgroundColor,
            },
            ...screen.options,
          }}
        />
      ))}
    </RouterStack>
  );
};
