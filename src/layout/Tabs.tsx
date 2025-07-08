import { ComponentProps, FC } from 'react';

import { Tabs as RouterTabs } from 'expo-router';

import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { useDarkMode } from '@/theme/useDarkMode';

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
export const useTabBarStyle = () => {
  const { colorModeValue, getThemeColor } = useDarkMode();

  return {
    backgroundColor: colorModeValue(
      getThemeColor('gray.50'),
      getThemeColor('gray.800')
    ),
    borderTopColor: colorModeValue(
      getThemeColor('gray.200'),
      getThemeColor('gray.900')
    ),
  };
};

export const Tabs: FC<TabsProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();
  const tabBarStyle = useTabBarStyle();
  return (
    <RouterTabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarStyle,
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
              tabBarActiveTintColor: colorModeValue(
                getThemeColor('brand.800'),
                getThemeColor('brand.100')
              ),
              tabBarInactiveTintColor: colorModeValue(
                getThemeColor('gray.500'),
                getThemeColor('gray.400')
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
