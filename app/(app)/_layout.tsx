import { Stack } from '@/layout/Stack';

const AppStack = () => {
  return (
    <Stack
      initialRouteName="(tabs)"
      screens={[
        {
          route: '(tabs)',
          options: {
            headerShown: false,
          },
        },
        {
          route: 'book/[id]',
          options: {
            headerShown: false,
          },
        },
      ]}
    />
  );
};

export default AppStack;
