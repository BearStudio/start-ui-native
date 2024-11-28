import { pokemonsList3 } from '@/constants/pokemons';
import React, { useState } from 'react';

import { Image, TouchableWithoutFeedback } from 'react-native';
import { Stack, Text, VStack } from 'react-native-ficus-ui';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Composant 1 : Pokémon qui bouge lors du clic
const PokemonMoveOnClick = () => {
  const translation = useSharedValue(0);

  const handlePress = () => {
    translation.value = withTiming(translation.value === 0 ? 200 : 0, {
      duration: 500,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value }],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <Image
          source={{
            uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
          }} // Salamèche
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
// Composant 2 : Pokémon qui tourne lors du clic
const PokemonRotateOnClick = () => {
  const rotation = useSharedValue(0);

  const handlePress = () => {
    rotation.value = withTiming(rotation.value + 360, { duration: 1000 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <Image
          source={{
            uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
          }} // Carapuce
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

// Composant 3 : Pokémon qui se transforme lors du clic
const PokemonTransformOnClick = () => {
  const [pokemonImage, setPokemonImage] = useState(
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
  );
  const fadeOpacity = useSharedValue(1);

  const handlePress = () => {
    fadeOpacity.value = withTiming(0, { duration: 500 }, (isFinished) => {
      if (isFinished) {
        // l'animation s'execute sur le thread natif
        runOnJS(changePokemonImage)();

        fadeOpacity.value = withTiming(1, { duration: 500 });
      }
    });
  };

  const changePokemonImage = () => {
    if (pokemonImage.includes('001.png')) {
      setPokemonImage(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png'
      );
    } else if (pokemonImage.includes('002.png')) {
      setPokemonImage(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png'
      );
    } else {
      setPokemonImage(
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[animatedStyle, { width: 100, height: 100 }]}>
        <Image
          source={{ uri: pokemonImage }}
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const Home = () => {
  return (
    <Stack p={20} h="100%" spacing={12}>
      <VStack spacing="lg">
        <Text fontSize="xl" fontWeight="bold">
          Interagissez avec les Pokémon
        </Text>
        <PokemonMoveOnClick />
        <PokemonRotateOnClick />
        <PokemonTransformOnClick />
      </VStack>
    </Stack>
  );
};

export default Home;
