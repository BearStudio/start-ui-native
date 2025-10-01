import { ComponentProps } from 'react';
import { Toaster } from 'sonner-native';

export const Sonner = ({ ...props }: ComponentProps<typeof Toaster>) => {
  return <Toaster theme="light" position="top-center" {...props} />;
};
