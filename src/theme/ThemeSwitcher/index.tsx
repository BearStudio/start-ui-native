import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { Button, Text, Box, Icon, ThemeContext } from 'react-native-ficus-ui';

import ficusTheme, { THEME_KEY } from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  /**
   * changes the theme on toggle press
   * if the theme is dark, set theme to light
   * else to dark
   */
  const onToggle = async () => {
    if (theme.name === 'dark') {
      setTheme(ficusTheme.light);
      StatusBar.setBarStyle('dark-content');
      await AsyncStorage.setItem(THEME_KEY, 'light');
    } else {
      setTheme(ficusTheme.dark);
      StatusBar.setBarStyle('light-content');
      await AsyncStorage.setItem(THEME_KEY, 'dark');
    }
  };

  return (
    <Box mt="lg">
      <Button onPress={onToggle} full>
        <Icon
          name={theme.name === 'light' ? 'moon' : 'sun'}
          fontSize="lg"
          fontFamily="Feather"
          color="gray.50"
        />
        <Text ml={10} fontSize="lg" color="gray.50">
          {theme.name === 'light' ? 'Dark mode' : 'Light mode'}
        </Text>
      </Button>
    </Box>
  );
}
