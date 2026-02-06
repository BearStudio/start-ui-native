import { useBrowser } from '@/hooks/use-browser';

import { Button } from '@/components/ui/button';

export default {
  title: 'Hooks/useBrowser',
};

export const Default = () => {
  const browser = useBrowser();
  return (
    <Button onPress={() => browser.open('https://native.start-ui.com')}>
      use browser
    </Button>
  );
};
