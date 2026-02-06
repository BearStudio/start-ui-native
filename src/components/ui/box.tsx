import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export type BoxProps = ViewProps & {
  className?: string;
};

export const Box = ({
  ref,
  className,
  ...props
}: BoxProps & { ref?: React.RefObject<View | null> }) => (
  <View ref={ref} className={cn(className)} {...props} />
);

Box.displayName = 'Box';
