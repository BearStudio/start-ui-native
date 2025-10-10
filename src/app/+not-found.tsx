import { Link } from 'expo-router';
import { Button, Center, Text } from 'react-native-ficus-ui';

import { ViewSafeContent } from '@/layout/view-safe-content';

export default function () {
  return (
    <ViewSafeContent>
      <Center flex={1}>
        <Text>This page doesn't exists 🤔</Text>
        <Link href="/(logged)/(tabs)/home" asChild>
          <Button>Go back in safe place</Button>
        </Link>
      </Center>
    </ViewSafeContent>
  );
}
