import { Tabs } from 'expo-router';

import {
  IconBookOpenDuotone,
  IconBookOpenFill,
  IconHouseDuotone,
  IconHouseFill,
  IconUserCircleDuotone,
  IconUserCircleFill,
} from '@/components/icons/generated';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'left',
        tabBarActiveTintColor: 'black',
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
