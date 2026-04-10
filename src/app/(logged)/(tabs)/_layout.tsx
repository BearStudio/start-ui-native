import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';

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
import { useThemedStyle } from '@/features/theme/use-themed-style';

export const WITH_NATIVE_TABS = isApple;

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
  iosIconSf: string;
}[];

export default function TabLayout() {
  const { t } = useTranslation(['layout']);

  const themedStyle = useThemedStyle();

  if (WITH_NATIVE_TABS) {
    return (
      <NativeTabs tintColor={themedStyle.color}>
        {TABS.map((tab) => (
          <NativeTabs.Trigger key={tab.name} name={tab.name}>
            <NativeTabs.Trigger.Label>
              {t(tab.translationKey)}
            </NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf={tab.iosIconSf} />
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
        sceneStyle: { backgroundColor: themedStyle.sceneBackgroundColor },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: t(tab.translationKey),
            headerShown: tab.headerShown,
            tabBarButton: (props) => <HapticTab {...props} />,
            tabBarIcon: (props) => {
              const TabIcon = props.focused ? tab.iconFocused : tab.icon;
              return (
                <TabIcon
                  color={props.color}
                  width={props.size}
                  height={props.size}
                />
              );
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
