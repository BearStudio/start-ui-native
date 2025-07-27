import { ComponentProps, FC } from 'react';

import { Tabs as RouterTabs } from 'expo-router';
import { Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

import TabBarIcon from '@/components/TabBarIcon';

type RouterTabsScreenComponentProps = ComponentProps<typeof RouterTabs.Screen>;
type RouterTabsComponentProps = ComponentProps<typeof RouterTabs>;

type TabsProps = {
  initialRouteName?: string;
  screens: (RouterTabsScreenComponentProps & {
    route: string;
    title?: string;
    icon: React.ComponentType<ExplicitAny>;
    focusedIcon?: React.ComponentType<ExplicitAny>;
    options?: RouterTabsScreenComponentProps['options'];
  })[];
} & RouterTabsComponentProps;

export const Tabs: FC<TabsProps> = ({
  initialRouteName = 'index',
  screens = [],
}) => {
  const { theme } = useTheme();
  const borderColor = useColorModeValue(
    (theme?.colors?.neutral as Dict)?.[200],
    (theme?.colors?.neutral as Dict)?.[800]
  );
  const backgroundColor = useColorModeValue(
    (theme?.colors?.neutral as Dict)?.[50],
    (theme?.colors?.neutral as Dict)?.[900]
  );
  const tabBarActiveTintColor = useColorModeValue(
    (theme?.colors?.neutral as Dict)?.['800'],
    (theme?.colors?.neutral as Dict)?.['50']
  );
  const tabBarInactiveTintColor = useColorModeValue(
    (theme?.colors?.neutral as Dict)?.['500'],
    (theme?.colors?.neutral as Dict)?.['400']
  );
  return (
    <RouterTabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarStyle: {
          backgroundColor,
          height: 64,
          paddingTop: 2,
          borderTopWidth: 1,
          borderColor,
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
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon
                color={color}
                focused={focused}
                icon={screen.icon}
                focusedIcon={screen.focusedIcon}
              />
            ),

            ...screen.options,
          }}
        />
      ))}
    </RouterTabs>
  );
};
