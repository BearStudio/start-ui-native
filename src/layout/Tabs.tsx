import { ComponentProps, FC } from 'react';

import { Tabs as RouterTabs } from 'expo-router';
import { Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';

type RouterTabsScreenComponentProps = ComponentProps<typeof RouterTabs.Screen>;
type RouterTabsComponentProps = ComponentProps<typeof RouterTabs>;

type TabsProps = {
  initialRouteName?: string;
  screens: (RouterTabsScreenComponentProps & {
    route: string;
    title?: string;
    icon?: FeatherIcons;
    options?: RouterTabsScreenComponentProps['options'];
  })[];
} & RouterTabsComponentProps;

export const Tabs: FC<TabsProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { theme } = useTheme();

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
      {screens.map((screen) => {
        const BarIcon = screen.icon ? TabBarIcon(screen.icon) : undefined;
        return (
          <RouterTabs.Screen
            key={screen.route}
            name={screen.route}
            options={{
              title: screen.title,
              tabBarActiveTintColor: useColorModeValue(
                (theme?.colors?.gray as Dict)?.['800'],
                (theme?.colors?.gray as Dict)?.['100']
              ),
              tabBarInactiveTintColor: useColorModeValue(
                (theme?.colors?.gray as Dict)?.['500'],
                (theme?.colors?.gray as Dict)?.['400']
              ),
              ...(BarIcon
                ? {
                    tabBarIcon: (props) => <BarIcon {...props} />,
                  }
                : {}),
              ...screen.options,
            }}
          />
        );
      })}
    </RouterTabs>
  );
};
