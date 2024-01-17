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
          route: 'repositories',
          title: 'Repositories',
          icon: 'folder',
          options: { headerShown: false },
        },
        {
          route: 'account',
          title: 'Account',
          icon: 'user',
          options: { headerShown: false },
        },
      ]}
    />
  );
};

export default HomeTabs;
