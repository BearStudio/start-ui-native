import React from 'react';

import { VStack } from 'react-native-ficus-ui';

import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import DemoCaption from '@/modules/home/components/DemoCaption';
import DemoMarketingBento from '@/modules/home/components/DemoMarketingBento';
import DemoWelcome from '@/modules/home/components/DemoWelcome';

const HomePage = () => {
  return (
    <Container>
      <Content>
        <VStack spacing="lg">
          <DemoWelcome />
          <DemoMarketingBento />
        </VStack>
        <DemoCaption />
      </Content>
    </Container>
  );
};

export default HomePage;
