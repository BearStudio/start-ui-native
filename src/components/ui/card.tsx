import { View, type ViewProps } from 'react-native';

import { Text } from '@/components/ui/text';

export const Card = (props: ViewProps) => {
  return (
    <View
      className="rounded-md border border-border bg-background"
      {...props}
    />
  );
};

export const CardHeader = (props: ViewProps) => {
  return <View className="flex flex-row justify-between p-4" {...props} />;
};

export const CardTitle = (props: React.ComponentProps<typeof Text>) => {
  return <Text className="font-bold" {...props} />;
};

export const CardBody = (props: ViewProps) => {
  return <View className="p-4" {...props} />;
};
