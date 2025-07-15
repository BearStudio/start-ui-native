import { Stack } from '@/layout/Stack';
import { useColorSchemeListener } from '@/theme/hooks';

const Storybook = () => {
  useColorSchemeListener();

  return (
    <Stack
      screens={[
        { route: 'index', title: 'Storybook', options: { headerShown: false } },
      ]}
    />
  );
};

export default Storybook;
