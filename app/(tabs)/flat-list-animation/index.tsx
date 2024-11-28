import React, { FC, useState } from 'react';

import { Box, Text } from 'react-native-ficus-ui';
import Animated, { LinearTransition } from 'react-native-reanimated';

import {
  initialListAPokemons,
  initialListBPokemons,
} from '@/constants/pokemons';
import { Container } from '@/layout/Container';
import { PokemonItem } from '@/modules/pokemons/PokemonItem';
import { ITEMS_GAP } from '@/modules/pokemons/PokemonRowItem';

const FlatListAnimation: FC = () => {
  const [listAPokemons, setListAPokemons] = useState(initialListAPokemons);
  const [listBPokemons, setListBPokemons] = useState(initialListBPokemons);

  const handlePress = (id: string) => {
    const pokemonAToMove = listAPokemons.find((p) => p.id === id);
    if (pokemonAToMove) {
      setListAPokemons(listAPokemons.filter((p) => p.id !== id));
      setListBPokemons([...listBPokemons, pokemonAToMove]);
      return;
    }
    const pokemonBToMove = listBPokemons.find((p) => p.id === id);
    if (pokemonBToMove) {
      setListBPokemons(listBPokemons.filter((p) => p.id !== id));
      setListAPokemons([...listAPokemons, pokemonBToMove]);
    }
  };

  const listPokemonWithSplitItem = listAPokemons
    .map((item) => item.id.toString())
    .concat('separator')
    .concat(listBPokemons.map((item) => item.id.toString()));

  return (
    <Container>
      <Box my="lg">
        <Text textAlign="center" fontSize="xl" fontWeight="700">
          Equipe A
        </Text>
      </Box>
      <Animated.FlatList
        data={listPokemonWithSplitItem}
        renderItem={({ item }) => (
          <PokemonItem id={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          padding: ITEMS_GAP,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: ITEMS_GAP,
          flexGrow: 1,
        }}
        itemLayoutAnimation={LinearTransition.springify()
          .stiffness(300)
          .damping(100)
          .mass(1)}
        skipEnteringExitingAnimations
      />
    </Container>
  );
};

export default FlatListAnimation;
