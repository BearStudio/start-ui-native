import { ComponentProps } from 'react';
import { Toaster } from 'sonner-native';
import { useUniwind } from 'uniwind';

export const Sonner = ({ ...props }: ComponentProps<typeof Toaster>) => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const toastTheme = hasAdaptiveThemes ? 'system' : (theme as 'light' | 'dark');

  return (
    <Toaster
      theme={toastTheme}
      position="top-center"
      visibleToasts={2}
      {...props}
    />
  );
};
