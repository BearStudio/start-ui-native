import { ComponentProps, FC } from 'react';

import { Stack as RouterStack } from 'expo-router';

import { FeatherIcons } from '@/components/TabBarIcon';
import { Header } from '@/layout/Header';
import { useDarkMode } from '@/theme/useDarkMode';

type RouterStackComponentProps = ComponentProps<typeof RouterStack>;
type RouterStackScreenComponentProps = ComponentProps<
  typeof RouterStack.Screen
>;

type StackProps = {
  initialRouteName?: string;
  screens: (RouterStackScreenComponentProps & {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: RouterStackScreenComponentProps['options'] & {
      isTabBarScreen?: boolean;
    };
  })[];
} & RouterStackComponentProps;

export const Stack: FC<StackProps> = ({
  initialRouteName = 'index',
  screens = [],
  ...rest
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();

  return (
    <RouterStack initialRouteName={initialRouteName} {...rest}>
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
