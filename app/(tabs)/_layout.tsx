import { Tabs } from '@/layout/Tabs';

const HomeTabs = () => {
  return (
    <Tabs
      screens={[
        {
          route: 'home',
          title: 'Home',
          icon: 'home',
          options: { headerShown: false },
        },
        {
          route: 'profile',
          title: 'Profile',
          icon: 'user',
          options: { headerShown: false },
        },
      ]}
    />
  );
};

export default HomeTabs;
