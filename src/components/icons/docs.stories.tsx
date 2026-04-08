import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';

import * as icons from './generated';

export default {
  title: 'Icons/Custom',
};

export const AllIcons = () => (
  <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
    <View className="gap-6 px-6">
      {Object.entries(icons).map(([name, Icon]) => (
        <CustomIcon name={name} key={name}>
          <Icon />
        </CustomIcon>
      ))}
    </View>
  </ScrollView>
);

const CustomIcon = ({
  children,
  name,
}: {
  children: ReactElement;
  name: string;
}) => {
  return (
    <Button variant="outline" className="w-full p-4">
      {children}
      {name}
    </Button>
  );
};
