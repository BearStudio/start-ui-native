import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type AnimatedStepIndicatorProps = { isActive?: boolean };

export const AnimatedStepIndicator = ({
  isActive,
}: AnimatedStepIndicatorProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(isActive ? 16 : 8, { duration: 200 }),
    opacity: withTiming(isActive ? 1 : 0.5, { duration: 200 }),
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'white',
          height: 8,
          borderRadius: 100,
        },
        animatedStyle,
      ]}
    />
  );
};
