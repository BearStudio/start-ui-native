import React, { FC, useCallback, useEffect } from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box } from 'react-native-ficus-ui';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { pokemonsList3 } from '@/constants/pokemons';

import Pokemon from '../../../assets/pokemon.png';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

type AnimatedPokemonProps = {
  source: string;
  index: number;
};

const AnimatedPokemon: FC<AnimatedPokemonProps> = ({ source, index }) => {
  const yPosition = useSharedValue(screenHeight + 200);
  const rotation = useSharedValue(0);
  const width = useSharedValue(100);
  const left = useSharedValue(0);

  const startAnimation = useCallback(() => {
    const randomDuration = randomBetween(5000, 7000);
    const widthRandom = randomBetween(100, 300);
    const randomDurationWithDelay = randomDuration - 500;

    yPosition.value = screenHeight + 200;
    rotation.value = withTiming(randomBetween(-40, 40), {
      duration: randomDurationWithDelay,
      easing: Easing.linear,
    });

    width.value = withTiming(widthRandom, {
      duration: randomDurationWithDelay,
      easing: Easing.linear,
    });

    left.value = withTiming(randomBetween(-50, screenWidth - 100), {
      duration: randomDurationWithDelay,
      easing: Easing.linear,
    });

    yPosition.value = withTiming(
      -100,
      {
        duration: randomDuration,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          runOnJS(startAnimation)();
        }
      }
    );
  }, [left, rotation, width, yPosition]);

  useEffect(() => {
    const delay = setTimeout(() => {
      startAnimation();
    }, index * 1000);
    return () => {
      clearTimeout(delay);
    };
  }, [startAnimation, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: yPosition.value },
      { rotate: `${rotation.value}deg` },
    ],
    width: width.value,
    aspectRatio: 1,
    top: -100,
    left: left.value,
  }));

  return (
    <Animated.View style={[styles.imageContainer, animatedStyle]}>
      <FastImage
        source={{ uri: source }}
        style={{ width: '100%', height: '100%' }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
  },
});

const RandomPokemon = () => {
  return (
    <Box flex={1} justify="center" alignItems="center">
      <Box alignItems="center" w="100%">
        <FastImage
          source={Pokemon}
          style={{ width: 300, aspectRatio: '3.5' }}
          resizeMode="contain"
        />
      </Box>
      {pokemonsList3.map((pokemon, index) => (
        <AnimatedPokemon
          key={pokemon.name + index}
          source={pokemon.imageUrl}
          index={index}
        />
      ))}
    </Box>
  );
};

export default RandomPokemon;
