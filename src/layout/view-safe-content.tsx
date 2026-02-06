import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/lib/tailwind/utils';

type ViewSafeContentProps = React.ComponentProps<typeof SafeAreaView>;

export const ViewSafeContent = ({
  className,
  ...props
}: ViewSafeContentProps) => {
  return <SafeAreaView className={cn('flex-1', className)} {...props} />;
};
