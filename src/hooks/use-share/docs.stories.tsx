import { useShare } from '@/hooks/use-share';

import { Button } from '@/components/ui/button';

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
