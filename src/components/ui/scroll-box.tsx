import * as React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export type ScrollBoxProps = ScrollViewProps & {
  className?: string;
};

export const ScrollBox = ({
  ref,
  className,
  contentContainerStyle,
  style,
  ...props
}: ScrollBoxProps & { ref?: React.RefObject<ScrollView | null> }) => (
  <ScrollView
    ref={ref}
    className={cn(className)}
    contentContainerStyle={contentContainerStyle}
    style={style}
    showsVerticalScrollIndicator={false}
    {...props}
  />
);

ScrollBox.displayName = 'ScrollBox';
