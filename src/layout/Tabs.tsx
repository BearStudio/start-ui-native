import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { Tabs as RouterTabs } from 'expo-router';
import { FC } from 'react';
import { useTheme } from 'react-native-magnus';

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
  const { theme } = useTheme();
  return (
    <RouterTabs
      initialRouteName={initialRouteName}
      screenOptions={{ tabBarStyle: { backgroundColor: theme.colors?.body } }}
    >
      {screens.map((screen) => (
        <RouterTabs.Screen
          key={screen.route}
          name={screen.route}
          options={{
            title: screen.title,
            tabBarActiveTintColor: theme.colors?.activeTint,
            tabBarIcon: screen.icon ? TabBarIcon(screen.icon) : undefined,
            ...screen.options,
          }}
        />
      ))}
    </RouterTabs>
  );
};
