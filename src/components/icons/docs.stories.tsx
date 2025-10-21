import { ReactElement } from 'react';
import { Button, ScrollBox, Stack } from 'react-native-ficus-ui';

import * as icons from './generated';

export default {
  title: 'Icons/Custom',
};

export const AllIcons = () => (
  <ScrollBox>
    <Stack spacing="md" px={24}>
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
    <Button variant="outline" p={3} full>
      {children}
      {name}
    </Button>
  );
};
