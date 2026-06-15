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

import { useThemedStyle } from '@/features/theme/use-themed-style';

export const WITH_NATIVE_TABS = true;

const TABS = [
  {
    name: 'home',
    translationKey: 'layout:tabs.home.title',
    icon: IconHouseDuotone,
    iconFocused: IconHouseFill,
    headerShown: false,
    iosIconSf: 'house.fill',
    androidIconMd: 'home',
  },
  {
    name: 'books',
    translationKey: 'layout:tabs.books.title',
    icon: IconBookOpenFill,
    iconFocused: IconBookOpenDuotone,
    headerShown: true,
    iosIconSf: 'book.fill',
    androidIconMd: 'book',
  },
  {
    name: 'account',
    translationKey: 'layout:tabs.account.title',
    icon: IconUserCircleFill,
    iconFocused: IconUserCircleDuotone,
    headerShown: false,
    iosIconSf: 'person.fill',
    androidIconMd: 'person',
  },
] as const satisfies {
  name: string;
  translationKey: string;
  icon: typeof IconHouseDuotone;
  iconFocused: typeof IconHouseDuotone;
  headerShown: boolean;
  iosIconSf: string;
  androidIconMd: string;
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
            <NativeTabs.Trigger.Icon
              sf={tab.iosIconSf}
              md={tab.androidIconMd}
            />
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
            tabBarAccessibilityLabel: t(tab.translationKey),
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
