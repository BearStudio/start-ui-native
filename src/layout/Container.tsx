import { FC, PropsWithChildren } from 'react';

import { Flex, FlexProps, SafeAreaBox } from 'react-native-ficus-ui';

import { useHideHeader, useHideTabBar } from '@/utils/routerUtils';

export const Container: FC<
  PropsWithChildren<FlexProps> & {
    isHeaderHidden?: boolean;
    isTabBarHidden?: boolean;
  }
> = ({ children, isHeaderHidden, isTabBarHidden, ...rest }) => {
  useHideHeader(!!isHeaderHidden);
  useHideTabBar(!!isTabBarHidden);
  return (
    <SafeAreaBox flex={1}>
      <Flex {...rest}>{children}</Flex>
    </SafeAreaBox>
  );
};
