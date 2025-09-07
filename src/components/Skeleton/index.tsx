import { LinearGradient } from 'expo-linear-gradient';
import {
  ShimmerPlaceholderProps,
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const Skeleton = {
  Text: (props: ShimmerPlaceholderProps) => (
    <ShimmerPlaceholder
      width={80}
      height={16}
      shimmerStyle={[{ borderRadius: 12 }]}
      {...props}
    />
  ),
  Box: (props: ShimmerPlaceholderProps) => (
    <ShimmerPlaceholder height={64} {...props} />
  ),
};
