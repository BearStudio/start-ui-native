import { Tabs } from 'expo-router';
import { useColorModeValue } from 'react-native-ficus-ui';

import theme from '@/lib/ficus-ui/theme';

import { HapticTab } from '@/components/haptic-tab';
import {
  IconBookOpenDuotone,
  IconBookOpenFill,
  IconHouseDuotone,
  IconHouseFill,
  IconUserCircleDuotone,
  IconUserCircleFill,
} from '@/components/icons/generated';

export default function TabLayout() {
  const themedStyle = useColorModeValue(
    {
      backgroundColor: 'white',
      color: theme.colors.neutral[950],
      sceneBackgroundColor: theme.colors.neutral[50],
    },
    {
      backgroundColor: theme.colors.neutral[950],
      color: 'white',
      sceneBackgroundColor: theme.colors.neutral[900],
    }
  );

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: themedStyle.backgroundColor },
        headerTintColor: themedStyle.color,
        tabBarStyle: { backgroundColor: themedStyle.backgroundColor },
        tabBarActiveTintColor: themedStyle.color,
        tabBarButton: (props) => <HapticTab {...props} />,
        sceneStyle: {
          backgroundColor: themedStyle.sceneBackgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: (props) => {
            const Icon = props.focused ? IconHouseFill : IconHouseDuotone;
            return <Icon color={props.color} w={props.size} h={props.size} />;
          },
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: (props) => {
            const Icon = props.focused ? IconBookOpenFill : IconBookOpenDuotone;
            return <Icon color={props.color} w={props.size} h={props.size} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: (props) => {
            const Icon = props.focused
              ? IconUserCircleFill
              : IconUserCircleDuotone;
            return <Icon color={props.color} w={props.size} h={props.size} />;
          },
        }}
      />
    </Tabs>
  );
}

/**
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="books">
        <Label>Books</Label>
        <Icon sf="book.circle.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <Label>Account</Label>
        <Icon sf="person.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
 */
