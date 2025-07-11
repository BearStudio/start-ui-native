import { FC, PropsWithChildren } from 'react';

import { Text, TextProps } from 'react-native-ficus-ui';

export const SectionTitle: FC<PropsWithChildren<TextProps>> = ({
  children,
  ...rest
}) => (
  <Text fontSize="xl" fontWeight="bold" {...rest}>
    {children}
  </Text>
);
