import { Stack } from '@/layout/Stack';

const AuthStack = () => {
  return (
    <Stack
      screens={[
        {
          route: 'onboarding',
          title: 'Onboarding',
          options: { headerShown: false },
        },
        { route: 'login', title: 'Login' },
        { route: 'register', title: 'Create Account' },
        { route: 'reset-password', title: 'Reset Password' },
      ]}
    />
  );
};

export default AuthStack;
