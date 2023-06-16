import { FeatherIcons, TabBarIcon } from '@/components/TabBarIcon';
import { Stack as RouterStack } from 'expo-router';
import { FC } from 'react';
import { useTheme } from 'react-native-magnus';

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
  const { theme } = useTheme();

  return (
    <RouterStack
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors?.body,
        },
        headerTintColor: theme.colors?.text,
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
            ...screen.options,
          }}
        />
      ))}
    </RouterStack>
  );
};
