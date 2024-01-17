import { Stack } from '@/layout/Stack';



const AuthStack = () => {
  console.log('here the auth stack')
  return (
    <Stack
      screens={[
        {
          route: '(auth)/onboarding',
          title: 'Onboarding',
          options: { headerShown: false },
        },
        { route: '(auth)/login', title: 'Login' },
        { route: '(auth)/register', title: 'Create Account' },
      ]}
      initialRouteName='(auth)/onboarding'
    />
  );
};

export default AuthStack;
