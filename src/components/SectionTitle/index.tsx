import { FC, PropsWithChildren } from 'react';

import { Text, TextProps } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export const SectionTitle: FC<PropsWithChildren<TextProps>> = ({
  children,
  ...rest
}) => {
  const { colorModeValue } = useDarkMode();

  return (
    <Text
      fontSize="xl"
      fontWeight="bold"
      color={colorModeValue('black', 'gray.50')}
      {...rest}
    >
      {children}
    </Text>
  );
};
