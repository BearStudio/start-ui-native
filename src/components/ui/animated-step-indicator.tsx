import { ViewProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedStepIndicatorProps = { isActive?: boolean };

export const AnimatedStepIndicator = (
  props: AnimatedStepIndicatorProps &
    Omit<ViewProps, 'style'> & { style?: ViewStyle }
) => {
  return (
    <Animated.View
      {...props}
      style={[
        {
          backgroundColor: 'white',
          height: 8,
          borderRadius: 100,
          ...props.style,
        },
        {
          width: props.isActive ? 16 : 8,
          opacity: props.isActive ? 1 : 0.5,
          transitionProperty: ['width', 'opacity'],
          transitionDuration: '200ms',
        },
      ]}
    />
  );
};
