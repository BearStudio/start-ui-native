import LogoBlack from '@assets/logo-black.svg';
import LogoWhite from '@assets/logo-white.svg';
import { StatusBar } from 'react-native';
import {
  Box,
  Dict,
  useColorMode,
  useColorModeValue,
  useTheme,
} from 'react-native-ficus-ui';

import { LanguageSelect } from '@/components/LanguageSelect';
import { ThemeSelect } from '@/components/ThemeSelect';

export const HeaderAuth = () => {
  const { colorMode } = useColorMode();
  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const { theme } = useTheme();
  const statusBarBackgroundColor = useColorModeValue(
    'white',
    (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
  );

  return (
    <Box
      flexDirection="row"
      px="xl"
      alignItems="center"
      gap="xl"
      py="lg"
      bg="white"
      _dark={{ bg: 'black' }}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarStyle}
      />

      {/* Logo */}
      {colorMode === 'dark' ? <LogoWhite /> : <LogoBlack />}

      {/* Spacer */}
      <Box flex={1} />

      {/* Theme selector */}
      <ThemeSelect />

      {/* Language selector */}
      <LanguageSelect />
    </Box>
  );
};
