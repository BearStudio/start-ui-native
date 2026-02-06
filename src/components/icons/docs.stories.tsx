import { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollBox } from '@/components/ui/scroll-box';
import { Stack } from '@/components/ui/stack';

import * as icons from './generated';

export default {
  title: 'Icons/Custom',
};

export const AllIcons = () => (
  <ScrollBox className="flex-1">
    <Stack spacing={24} className="px-6">
      {Object.entries(icons).map(([name, Icon]) => (
        <CustomIcon name={name} key={name}>
          <Icon />
        </CustomIcon>
      ))}
    </Stack>
  </ScrollBox>
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
