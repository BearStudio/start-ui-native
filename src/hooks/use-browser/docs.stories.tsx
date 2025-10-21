import { Button } from 'react-native-ficus-ui';

import { useBrowser } from '@/hooks/use-browser';

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
