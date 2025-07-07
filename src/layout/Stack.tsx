import { ComponentProps, FC } from 'react';

import { Stack as RouterStack } from 'expo-router';

import { FeatherIcons } from '@/components/TabBarIcon';
import { Header } from '@/layout/Header';
import { useDarkMode } from '@/theme/useDarkMode';

type RouterStackComponentProps = ComponentProps<typeof RouterStack.Screen>;

type StackProps = {
  initialRouteName?: string;
  screens: (RouterStackComponentProps & {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: RouterStackComponentProps['options'] & {
      isTabBarScreen?: boolean;
    };
  })[];
};

export const Stack: FC<StackProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();

  return (
    <RouterStack initialRouteName={initialRouteName}>
      {screens.map(
        ({
          route,
          title,
          icon,
          options: { isTabBarScreen, ...otherOptions } = {},
          ...rest
        }) => (
          <RouterStack.Screen
            key={route}
            name={route}
            options={{
              title: title,
              contentStyle: {
                backgroundColor: colorModeValue(
                  getThemeColor('gray.100'),
                  getThemeColor('gray.800')
                ),
              },
              header: ({ options }) => (
                <Header title={options.title} hasGoBack={!isTabBarScreen} />
              ),
              ...otherOptions,
            }}
            {...rest}
          />
        )
      )}
    </RouterStack>
  );
};
