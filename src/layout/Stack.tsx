import { ComponentProps, FC, ReactNode } from 'react';

import { Stack as RouterStack } from 'expo-router';
import { Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

import { Header } from '@/layout/Header';

type RouterStackComponentProps = ComponentProps<typeof RouterStack>;
type RouterStackScreenComponentProps = ComponentProps<
  typeof RouterStack.Screen
>;

type StackProps = {
  initialRouteName?: string;
  screens: (RouterStackScreenComponentProps & {
    route: string;
    title?: string;
    icon?: ReactNode;
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
  const { theme } = useTheme();

  const backgroundColor = useColorModeValue(
    (theme?.colors?.neutral as Dict)?.[100],
    (theme?.colors?.neutral as Dict)?.[800]
  );

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
                backgroundColor,
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
