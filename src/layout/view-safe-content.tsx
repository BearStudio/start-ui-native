import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

type ViewSafeContentProps = React.ComponentProps<typeof SafeAreaView>;

const UniwindSafeAreaView = withUniwind(SafeAreaView);

export const ViewSafeContent = ({
  className,
  ...props
}: ViewSafeContentProps) => {
  return <UniwindSafeAreaView className={cn('flex-1', className)} {...props} />;
};
