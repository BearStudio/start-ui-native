import { ScrollView } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

type ViewSafeScrollContentProps = React.ComponentProps<typeof ScrollView>;

export const ViewSafeScrollContent = ({
  className,
  contentContainerClassName,
  ...props
}: ViewSafeScrollContentProps) => {
  return (
    <ScrollView
      className={cn('relative flex-1 p-4', className)}
      contentContainerClassName={cn(
        'flex flex-1 p-safe',
        contentContainerClassName
      )}
      {...props}
    />
  );
};
