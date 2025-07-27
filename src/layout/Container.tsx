import { FC, PropsWithChildren } from 'react';

import { Flex, FlexProps, SafeAreaBox } from 'react-native-ficus-ui';

export const Container: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <SafeAreaBox flex={1}>
      <Flex
        {...rest}
        bg="neutral.50"
        _dark={{
          bg: 'black',
        }}
      >
        {children}
      </Flex>
    </SafeAreaBox>
  );
};
