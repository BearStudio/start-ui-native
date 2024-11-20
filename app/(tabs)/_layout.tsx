import { Cat, Folder, Home, Rabbit, Turtle } from 'lucide-react-native';
import { useTheme } from 'react-native-ficus-ui';

import { Tabs } from '@/layout/Tabs';
import Animated from 'react-native-reanimated';

const HomeTabs = () => {
  const {
    theme: { colors },
  } = useTheme();
  Animated.View
  Animated.Text
  Animated.FlatList
  Animated.Image
  Animated.ScrollView
  Animated.createAnimatedComponent
  return (
    <Tabs
      screens={[
        {
          route: 'home',
          title: 'Animations',
          icon: <Rabbit color={colors?.gray[600]} />,
          options: { headerShown: false },
        },
        {
          route: 'flat-list-row-animation',
          title: 'Flat list row animation',
          icon: <Turtle color={colors?.gray[600]} />,
          options: { headerShown: false },
        },
        {
          route: 'flat-list-animation',
          title: 'Flat list animation',
          icon: <Cat color={colors?.gray[600]} />,
          options: { headerShown: false },
        },
      ]}
    />
  );
};

export default HomeTabs;
