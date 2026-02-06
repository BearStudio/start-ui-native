import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '@/components/icons/generated';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { HStack } from '@/components/ui/stack';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export const AuthHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <HStack
      className="absolute left-0 right-0 items-center justify-between p-6"
      style={{ top: insets.top }}
    >
      <Logo color="black" width={96} height={22} />
      <HStack spacing={16}>
        <ThemeSwitcher minimize />
        <LocaleSwitcher />
      </HStack>
    </HStack>
  );
};
