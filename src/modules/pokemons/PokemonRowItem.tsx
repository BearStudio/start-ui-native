import { FC } from 'react';

import { Dimensions } from 'react-native';
import { Box, Button, Image, Text } from 'react-native-ficus-ui';

import {
  initialListAPokemons,
  initialListBPokemons,
} from '@/constants/pokemons';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pokemonBall from '../../../assets/pngwing.png';

export const ITEMS_GAP = 8;
export const ITEM_SIZE = Dimensions.get('screen').width / 3 - ITEMS_GAP * 2;

export const PokemonRowItem: FC<{
  id: string;
  onPress: (id: string) => void;
}> = ({ id, onPress }) => {
  if (id === 'separator') {
    return (
      <Box my="lg">
        <Text textAlign="center" fontSize="xl" fontWeight="700">
          Equipe B
        </Text>
      </Box>
    );
  }

  const pokemon = initialListAPokemons
    .concat(initialListBPokemons)
    .find((p) => p.id === id);

  return (
    <Button
      underlayColor="brand.50"
      zIndex={2}
      bg="white"
      onPress={() => onPress(id)}
      py={0}
      px={0}
      shadow="md"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        p="xs"
        bg="transparent"
        borderRadius={8}
        flex={1}
      >
        <Image
          source={{ uri: pokemon?.image }}
          style={{ width: 80, height: 80, marginRight: 16 }}
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {pokemon?.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {pokemon?.type}
          </Text>
        </Box>
      </Box>
      <Image source={pokemonBall} w={50} h={50} mr="lg" />
    </Button>
  );
};
