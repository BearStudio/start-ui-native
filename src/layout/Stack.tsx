import { ComponentProps, FC } from 'react';

import { Stack as RouterStack } from 'expo-router';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { useDarkMode } from '@/theme/useDarkMode';

type RouterStackComponentProps = ComponentProps<typeof RouterStack.Screen>;

type StackProps = {
  initialRouteName?: string;
  screens: (RouterStackComponentProps & {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: ExplicitAny; // TODO: update
  })[];
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
      {screens.map(({ route, title, icon, options, ...rest }) => (
        <RouterStack.Screen
          key={route}
          name={route}
          options={{
            title: title,
            tabBarIcon: icon ? TabBarIcon(icon) : undefined,
            contentStyle: {
              backgroundColor: colorModeValue(
                getThemeColor('gray.100'),
                getThemeColor('gray.800')
              ),
            },
            ...options,
          }}
          {...rest}
        />
      ))}
    </RouterStack>
  );
};
