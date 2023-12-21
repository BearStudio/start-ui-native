import { FC, PropsWithChildren } from 'react';

import { Flex, FlexProps } from 'react-native-ficus-ui';

export const Content: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Flex p="xl" {...rest}>
      {children}
    </Flex>
  );
};
