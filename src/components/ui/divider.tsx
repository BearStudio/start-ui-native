import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export type DividerProps = ViewProps & {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export const Divider = ({
  ref,
  className,
  orientation = 'horizontal',
  ...props
}: DividerProps & { ref?: React.RefObject<View | null> }) => (
  <View
    ref={ref}
    className={cn(
      'bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
);

Divider.displayName = 'Divider';
