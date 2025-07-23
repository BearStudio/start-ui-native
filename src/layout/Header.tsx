import { FC } from 'react';

import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';
import {
  Box,
  BoxProps,
  Dict,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useTheme,
} from 'react-native-ficus-ui';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

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
        backgroundColor={useColorModeValue(
          'white',
          (theme.colors?.gray as Dict)?.[600] ?? 'gray'
        )}
        barStyle={useColorModeValue('dark-content', 'light-content')}
      />
      <Box
        h={HEADER_HEIGHT}
        w="100%"
        flexDirection="row"
        alignItems="center"
        bg={useColorModeValue(
          'white',
          (theme.colors?.gray as Dict)?.[600] ?? 'gray'
        )}
        style={{ gap: theme.space?.lg as number }}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
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
            color={useColorModeValue('gray.700', 'white')}
            alignSelf="center"
            size="xl"
            icon={<Icon name="arrow-left" iconSet="Feather" />}
            rounded="full"
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
            color={useColorModeValue('gray.800', 'gray.100')}
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
};
