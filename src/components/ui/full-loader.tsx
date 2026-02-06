import { ActivityIndicator } from 'react-native';

import { Center } from '@/components/ui/stack';

export const FullLoader = () => {
  return (
    <Center flex={1}>
      <ActivityIndicator />
    </Center>
  );
};
