import React from 'react';
import {Div, Text} from 'react-native-magnus';
import Button from '../../../components/Button';

const Components = () => {
  return (
    <Div bg="body" h="100%" p="xl">
      <Div my="2xl">
        <Text fontSize="6xl">🧩 Components</Text>
      </Div>

      <Div>
        <Text fontWeight="bold" fontSize="2xl" mb={5}>
          Buttons
        </Text>

        <Text fontWeight="bold" fontSize="lg" mb="md">
          Color schemes
        </Text>

        <Div row flexWrap="wrap" mb="lg">
          <Button mb="md" mr="md">
            Default
          </Button>
          <Button colorScheme="primary" mb="md" mr="md">
            Primary
          </Button>
          <Button colorScheme="secondary" mb="md" mr="md">
            Secondary
          </Button>
          <Button colorScheme="accent" mb="md" mr="md">
            Accent
          </Button>
          <Button colorScheme="gray" mb="md" mr="md">
            Gray
          </Button>
          <Button colorScheme="dark" mb="md" mr="md">
            Dark
          </Button>
        </Div>

        <Text fontWeight="bold" fontSize="lg" mb="md">
          Variants
        </Text>

        <Div flexWrap="wrap" mb="lg">
          <Button colorScheme="primary" mb="md" mr="md">
            Default
          </Button>
          <Button variant="outline" colorScheme="primary" mb="md" mr="md">
            Outline
          </Button>
          <Button variant="block" colorScheme="primary" mb="md" mr="md">
            Block
          </Button>
          <Button variant="link" colorScheme="primary" mb="md" mr="md">
            Link
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

export default Components;
