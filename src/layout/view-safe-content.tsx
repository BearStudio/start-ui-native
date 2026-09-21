import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export const ViewSafeContent = ({ className, ...props }: ViewProps) => {
  return (
    <View className={cn('relative flex-1 p-safe', className)} {...props} />
  );
};
