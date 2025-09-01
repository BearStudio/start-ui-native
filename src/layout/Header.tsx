import { FC } from 'react';

import LogoBlack from '@assets/logo-black.svg';
import LogoWhite from '@assets/logo-white.svg';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'react-native';
import {
  Box,
  BoxProps,
  Dict,
  Divider,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
} from 'react-native-ficus-ui';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LanguageSelect } from '@/components/LanguageSelect';
import { LucideIcon } from '@/components/LucideIcon';
import { ThemeSelect } from '@/components/ThemeSelect';

export const HEADER_HEIGHT = 64;

export type HeaderVariant = 'default' | 'auth' | 'home';

export type HeaderProps = {
  variant?: HeaderVariant;
  /** Main title text (only used with 'default' variant) */
  title?: string;
  /** Show a back arrow on the left if true (only used with 'default' variant) */
  hasGoBack?: boolean;
} & BoxProps;

const DefaultHeader: FC<HeaderProps> = ({
  title,
  hasGoBack = false,
  ...rest
}) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const statusBarBackgroundColor = useColorModeValue(
    'white',
    (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
  );

  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      exiting={FadeOutUp.duration(150)}
      style={{ position: 'relative', zIndex: 10 }}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarStyle}
      />
      <Box
        pt={insets.top + 16}
        pb="lg"
        flexDirection="row"
        alignItems="center"
        bg={useColorModeValue(
          'white',
          (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
        )}
        borderColor={useColorModeValue('neutral.200', 'neutral.800')}
        borderWidth={1}
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        px={16}
        {...rest}
      >
        {hasGoBack && router.canGoBack() ? (
          <>
            <IconButton
              variant="ghost"
              onPress={handleGoBack}
              color={useColorModeValue('neutral.700', 'white')}
              alignSelf="center"
              size="lg"
              icon={<LucideIcon icon={ArrowLeft} size={16} />}
              rounded="md"
            />
            <Divider
              orientation="vertical"
              h={16}
              color="neutral.200"
              _dark={{
                color: 'neutral.800',
              }}
              mr="lg"
            />
          </>
        ) : null}

        <Box flex={1} flexDirection="column">
          <Text
            fontSize="md"
            variant="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            color={useColorModeValue('neutral.800', 'neutral.100')}
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
};

const AuthHeader: FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const statusBarBackgroundColor = useColorModeValue('white', 'black');

  const insets = useSafeAreaInsets();

  return (
    <Box
      flexDirection="row"
      px="xl"
      alignItems="center"
      gap="xl"
      py="lg"
      bg="white"
      _dark={{ bg: 'black' }}
      pt={insets.top}
      {...rest}
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

const HomeHeaderVariant: FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  const statusBarStyle = useColorModeValue('dark-content', 'light-content');
  const { theme } = useTheme();
  const statusBarBackgroundColor = useColorModeValue(
    'white',
    (theme.colors?.neutral as Dict)?.[900] ?? 'neutral'
  );
  const insets = useSafeAreaInsets();

  return (
    <Box
      px="xl"
      alignItems="center"
      gap="xl"
      py="lg"
      pt={insets.top + 16}
      bg="white"
      _dark={{ bg: 'neutral.900' }}
      borderBottomColor={useColorModeValue('neutral.200', 'neutral.800')}
      {...rest}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarStyle}
      />
      {/* Logo */}
      {colorMode === 'dark' ? <LogoWhite /> : <LogoBlack />}
    </Box>
  );
};

export const Header: FC<HeaderProps> = ({ variant = 'default', ...props }) => {
  switch (variant) {
    case 'auth':
      return <AuthHeader {...props} />;
    case 'home':
      return <HomeHeaderVariant {...props} />;
    case 'default':
    default:
      return <DefaultHeader {...props} />;
  }
};

export const HeaderAuth = (props: HeaderProps) => (
  <Header variant="auth" {...props} />
);
export const HomeHeader = (props: HeaderProps) => (
  <Header variant="home" {...props} />
);
