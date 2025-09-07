import { FC, PropsWithChildren } from 'react';

import { ScrollBox, ScrollBoxProps } from 'react-native-ficus-ui';

export const Content: FC<PropsWithChildren<ScrollBoxProps>> = ({
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
