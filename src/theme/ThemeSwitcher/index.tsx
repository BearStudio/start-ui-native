import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { Button, Text, Div, Icon, ThemeContext } from 'react-native-magnus';

import { THEME_KEY, theme as magnusTheme } from '@/theme';
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
      setTheme(magnusTheme.light);
      StatusBar.setBarStyle('dark-content');
      await AsyncStorage.setItem(THEME_KEY, 'light');
    } else {
      setTheme(magnusTheme.dark);
      StatusBar.setBarStyle('light-content');
      await AsyncStorage.setItem(THEME_KEY, 'dark');
    }
  };

  return (
    <Div mt="lg">
      <Button
        onPress={onToggle}
        bg={theme.colors?.cancelButtonBg}
        color={theme.colors?.cancelButtonColor}
        block
      >
        <Icon
          name={theme.name === 'light' ? 'moon' : 'sun'}
          color={theme.colors?.cancelButtonColor}
          fontSize="lg"
          fontFamily="Feather"
        />
        <Text ml={10} fontSize="lg" color={theme.colors?.cancelButtonColor}>
          {theme.name === 'light' ? 'Dark mode' : 'Light mode'}
        </Text>
      </Button>
    </Div>
  );
}
