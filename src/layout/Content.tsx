import { FC, PropsWithChildren } from 'react';

import { FlexProps, ScrollBox } from 'react-native-ficus-ui';

export const Content: FC<PropsWithChildren<FlexProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ScrollBox
      flexGrow={1}
      p="xl"
      contentContainerStyle={{ flex: 1 }}
      {...rest}
    >
      {children}
    </ScrollBox>
  );
};
