import { useEffect } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import theme from '@/lib/ficus-ui/theme';

export type SkeletonProps = Omit<ViewProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = (props: SkeletonProps) => {
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      {...props}
      style={[
        animatedStyles,
        {
          minHeight: 24,
          minWidth: 24,
          backgroundColor: theme.colors.neutral[500],
          borderRadius: 8,
          flex: 1,
        },
        props.style,
      ]}
    />
  );
};
