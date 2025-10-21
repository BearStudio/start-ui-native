import { Button } from 'react-native-ficus-ui';

import { useShare } from '@/hooks/use-share';

export default {
  title: 'Hooks/useShare',
};

export const Default = () => {
  const share = useShare();
  return (
    <Button
      onPress={() =>
        share.open({
          message: 'https://native.start-ui.com',
        })
      }
    >
      use share
    </Button>
  );
};
