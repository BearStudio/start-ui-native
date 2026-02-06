import type { ViewProps } from 'react-native';

import { Box, type BoxProps } from '@/components/ui/box';
import { HStack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const Card = (props: BoxProps) => {
  return (
    <Box
      className="rounded-md border border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800"
      {...props}
    />
  );
};

export const CardHeader = (props: ViewProps) => {
  return <HStack className="justify-between p-4" {...props} />;
};

export const CardTitle = (props: React.ComponentProps<typeof Text>) => {
  return <Text className="font-bold" {...props} />;
};

export const CardBody = (props: BoxProps) => {
  return <Box className="p-4" {...props} />;
};
