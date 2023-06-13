import { Stack } from '@/layout/Stack';

const ProfileStack = () => {
  return (
    <Stack
      screens={[
        { route: 'index', title: 'Profile' },
        { route: 'profile-password', title: 'Update password' },
      ]}
    />
  );
};

export default ProfileStack;
