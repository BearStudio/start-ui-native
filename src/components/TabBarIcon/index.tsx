import { Feather } from '@expo/vector-icons';
import { FC } from 'react';

export type FeatherIcons = keyof (typeof Feather)['glyphMap'];

export const TabBarIcon: (
  name: FeatherIcons
) => FC<{ color: string; size: number; focused: boolean }> =
  (name) =>
  ({ color, size }) =>
    <Feather name={name} size={size} color={color} />;
