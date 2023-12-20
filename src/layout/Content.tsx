import { FC, PropsWithChildren } from 'react';
import { FlexProps, Flex } from 'react-native-ficus-ui';

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
