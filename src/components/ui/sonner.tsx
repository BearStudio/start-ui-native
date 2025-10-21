import { ComponentProps } from 'react';
import { useColorScheme } from 'react-native';
import { Toaster } from 'sonner-native';

export const Sonner = ({ ...props }: ComponentProps<typeof Toaster>) => {
  const scheme = useColorScheme();
  return (
    <Toaster
      theme={scheme ?? 'system'}
      position="top-center"
      visibleToasts={2}
      {...props}
    />
  );
};
