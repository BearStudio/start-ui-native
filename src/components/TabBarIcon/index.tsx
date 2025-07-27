import type { FC } from 'react';
import React from 'react';

import { Box } from 'react-native-ficus-ui';

type TabBarIconProps = {
  icon: React.ComponentType<ExplicitAny>;
  focusedIcon?: React.ComponentType<ExplicitAny>;
  focused: boolean;
  color: string;
};

const TabBarIcon: FC<TabBarIconProps> = ({
  icon: Icon,
  focusedIcon: FocusedIcon,
  focused,
  color,
}) => {
  if (focused && FocusedIcon) {
    return <Box as={FocusedIcon} stroke={color} color={color} />;
  }
  return <Box as={Icon} stroke={color} color="transparent" opacity={0.5} />;
};

export default TabBarIcon;
