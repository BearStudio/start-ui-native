import { Stack } from '@/layout/Stack';

const Storybook = () => {
  return (
    <Stack
      screens={[
        { route: 'index', title: 'Storybook', options: { headerShown: false } },
      ]}
    />
  );
};

export default Storybook;
