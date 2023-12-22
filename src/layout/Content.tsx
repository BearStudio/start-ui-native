import { FC, PropsWithChildren } from 'react';

import { FlexProps, ScrollBox } from 'react-native-ficus-ui';

export const Content: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ScrollBox flex={1} p="xl" minH="100%" {...rest}>
      {children}
    </ScrollBox>
  );
};
