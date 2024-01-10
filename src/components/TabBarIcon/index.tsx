import { FC } from 'react';

import { Feather } from '@expo/vector-icons';

export type FeatherIcons = keyof (typeof Feather)['glyphMap'];

export const TabBarIcon: (
  name: FeatherIcons
) => FC<{ color: string; size: number; focused: boolean }> =
  (name) =>
  ({ color, size }) => <Feather name={name} size={size} color={color} />;
