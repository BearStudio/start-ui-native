import BookFilled from '@assets/tabs/book-filled.svg';
import Book from '@assets/tabs/book.svg';
import HouseFilled from '@assets/tabs/house-filled.svg';
import House from '@assets/tabs/house.svg';
import UserCircleFilled from '@assets/tabs/user-circle-filled.svg';
import UserCircle from '@assets/tabs/user-circle.svg';
import { useTranslation } from 'react-i18next';

import { HomeHeader } from '@/layout/Header';
import { Tabs } from '@/layout/Tabs';
import { useColorSchemeListener } from '@/theme/hooks';

const HomeTabs = () => {
  const { t } = useTranslation();

  useColorSchemeListener();

  return (
    <Tabs
      initialRouteName="home"
      screens={[
        {
          route: 'home',
          title: t('layouts:tabs.home'),
          icon: House,
          focusedIcon: HouseFilled,
          options: { header: () => <HomeHeader /> },
        },
        {
          route: 'books',
          title: t('layouts:tabs.books'),
          icon: Book,
          focusedIcon: BookFilled,
          options: { headerShown: false },
        },
        {
          route: 'account',
          title: t('layouts:tabs.account'),
          icon: UserCircle,
          focusedIcon: UserCircleFilled,
          options: { headerShown: false },
        },
      ]}
    />
  );
};

export default HomeTabs;
