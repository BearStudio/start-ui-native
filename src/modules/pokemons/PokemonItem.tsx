import { FC } from 'react';

import { Dimensions } from 'react-native';
import { Box, Button, Image, Text } from 'react-native-ficus-ui';

import {
  initialListAPokemons,
  initialListBPokemons,
} from '@/constants/pokemons';
import { ITEM_SIZE } from '@/modules/pokemons/PokemonRowItem';

export const PokemonItem: FC<{ id: string; onPress: (id: string) => void }> = ({
  id,
  onPress,
}) => {
  const pokemon = initialListAPokemons
    .concat(initialListBPokemons)
    .find((p) => p.id === id);

  if (id === 'separator') {
    return (
      <Box h={50} w={Dimensions.get('screen').width} justify="center">
        <Text textAlign="center" fontSize="xl" fontWeight="700">
          Equipe B
        </Text>
      </Box>
    );
  }

  return (
    <Button
      underlayColor="brand.50"
      zIndex={2}
      bg="white"
      onPress={() => onPress(id)}
      py={0}
      px={0}
      shadow="md"
      flex={1}
      w={ITEM_SIZE}
      h={ITEM_SIZE}
    >
      <Box
        w={ITEM_SIZE}
        h={ITEM_SIZE}
        justifyContent="center"
        alignItems="center"
        position="relative"
        borderRadius={8}
        overflow="hidden"
        bg="gray.200"
      >
        <Image
          source={{ uri: pokemon?.image }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Box
          position="absolute"
          bottom={0}
          w="100%"
          bg="black"
          opacity={0.5}
          p="xs"
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            {pokemon?.name}
          </Text>
          <Text fontSize="sm" color="white" textAlign="center">
            {pokemon?.type}
          </Text>
        </Box>
      </Box>
    </Button>
  );
};
