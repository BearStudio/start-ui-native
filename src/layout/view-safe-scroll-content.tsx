import { ScrollView } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

type ViewSafeScrollContentProps = React.ComponentProps<typeof ScrollView> & {
  withHeader?: boolean;
};

export const ViewSafeScrollContent = ({
  className,
  contentContainerClassName,
  withHeader = false,
  ...props
}: ViewSafeScrollContentProps) => {
  return (
    <ScrollView
      className={cn('relative flex-1 p-4 md:px-6 md:py-8', className)}
      contentContainerClassName={cn(
        withHeader ? 'flex flex-1 px-safe pb-safe' : 'flex flex-1 p-safe',
        contentContainerClassName
      )}
      {...props}
    />
  );
};
