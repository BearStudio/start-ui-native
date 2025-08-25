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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TabsHeader = () => {
  const { colorMode } = useColorMode();
  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const { theme } = useTheme();
  const statusBarBackgroundColor = useColorModeValue(
    'white',
    (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
  );
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box
        px="xl"
        alignItems="center"
        gap="xl"
        py="lg"
        pt={insets.top}
        bg="white"
        _dark={{ bg: 'neutral.900' }}
        borderBottomColor={useColorModeValue('neutral.200', 'neutral.800')}
      >
        <StatusBar
          backgroundColor={statusBarBackgroundColor}
          barStyle={statusBarStyle}
        />
        {/* Logo */}
        {colorMode === 'dark' ? <LogoWhite /> : <LogoBlack />}
      </Box>
    </>
  );
};
