import { HStack } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '@/components/icons/generated';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export const AuthHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <HStack
      justifyContent="space-between"
      p={24}
      alignItems="center"
      position="absolute"
      top={insets.top}
      left={0}
      right={0}
    >
      <Logo color="black" _dark={{ color: 'white' }} width={96} height={22} />
      <HStack gap={16}>
        <ThemeSwitcher minimize />
        <LocaleSwitcher />
      </HStack>
    </HStack>
  );
};
