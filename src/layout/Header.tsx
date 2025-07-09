import { FC } from 'react';

import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';
import {
  Box,
  BoxProps,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-ficus-ui';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { useDarkMode } from '@/theme/useDarkMode';

export const HEADER_HEIGHT = 64;

export type HeaderProps = {
  /** Main title text */
  title?: string;
  /** Show a back arrow on the left if true */
  hasGoBack?: boolean;
} & BoxProps;

export const Header: FC<HeaderProps> = ({
  title,
  hasGoBack = false,
  ...rest
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { colorModeValue } = useDarkMode();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      exiting={FadeOutUp.duration(150)}
      style={{ position: 'relative', zIndex: 10 }}
    >
      <StatusBar
        backgroundColor={colorModeValue(
          'white',
          theme.colors?.gray?.[600] ?? 'gray'
        )}
        barStyle={colorModeValue('dark-content', 'light-content')}
      />
      <Box
        h={HEADER_HEIGHT}
        w="100%"
        flexDirection="row"
        alignItems="center"
        bg={colorModeValue('white', theme.colors?.gray?.[600] ?? 'gray')}
        style={{ gap: theme.spacing?.lg }}
        borderColor={colorModeValue('gray.200', 'gray.700')}
        borderWidth={1}
        borderTopWidth={0}
        px="lg"
        pl={hasGoBack ? undefined : 'xl'}
        borderBottomRadius={32}
        {...rest}
      >
        {hasGoBack && router.canGoBack() ? (
          <IconButton
            variant="ghost"
            onPress={handleGoBack}
            color={colorModeValue('gray.700', 'white')}
            alignSelf="center"
            size="lg"
            icon={<Icon fontFamily="Feather" name="arrow-left" fontSize="md" />}
          />
        ) : (
          <Box w={10} />
        )}

        <Box flex={1} flexDirection="column">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colorModeValue('gray.800', 'gray.100')}
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
};
