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

export const TabsHeader = () => {
  const { colorMode } = useColorMode();
  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const { theme } = useTheme();
  const statusBarBackgroundColor = useColorModeValue(
    'white',
    (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
  );
  return (
    <>
      <Box
        px="xl"
        alignItems="center"
        gap="xl"
        py="lg"
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
