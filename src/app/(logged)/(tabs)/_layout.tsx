import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
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

import { isApple } from '@/constants/device';

const TABS = [
  {
    name: 'home',
    translationKey: 'layout:tabs.home.title',
    icon: IconHouseDuotone,
    iconFocused: IconHouseFill,
    headerShown: false,
    iosIconSf: 'house.fill',
  },
  {
    name: 'books',
    translationKey: 'layout:tabs.books.title',
    icon: IconBookOpenFill,
    iconFocused: IconBookOpenDuotone,
    headerShown: true,
    iosIconSf: 'book.fill',
  },
  {
    name: 'account',
    translationKey: 'layout:tabs.account.title',
    icon: IconUserCircleFill,
    iconFocused: IconUserCircleDuotone,
    headerShown: false,
    iosIconSf: 'person.fill',
  },
] as const satisfies {
  name: string;
  translationKey: string;
  icon: typeof IconHouseDuotone;
  iconFocused: typeof IconHouseDuotone;
  headerShown: boolean;
  iosIconSf: ComponentProps<typeof Icon>['sf'];
}[];

export default function TabLayout() {
  const { t } = useTranslation(['layout']);

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

  if (isApple) {
    return (
      <NativeTabs>
        {TABS.map((tab) => (
          <NativeTabs.Trigger
            key={tab.name}
            name={tab.name}
            options={{ backgroundColor: themedStyle.backgroundColor }}
          >
            <Label>{t(tab.translationKey)}</Label>
            <Icon sf={tab.iosIconSf} />
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>
    );
  }

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
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: t(tab.translationKey),
            headerShown: tab.headerShown,
            tabBarIcon: (props) => {
              const Icon = props.focused ? tab.iconFocused : tab.icon;
              return <Icon color={props.color} w={props.size} h={props.size} />;
            },
          }}
        />
      ))}
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
