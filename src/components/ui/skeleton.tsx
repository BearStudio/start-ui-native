'use no memo';

import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib/tailwind/utils';

const duration = 1000;

function useSkeletonPulse() {
  const sv = useSharedValue(1);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(0.5, { duration }), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return useAnimatedStyle(() => ({ opacity: sv.value }), [sv]);
}

function Skeleton({
  className,
  style,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const animatedStyle = useSkeletonPulse();

  return (
    <Animated.View
      className={cn('bg-accent rounded-md', className)}
      {...props}
      style={[style, animatedStyle]}
    />
  );
}

export { Skeleton };
