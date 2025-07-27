import { LucideIcon as LucideIconType, LucideProps } from 'lucide-react-native';
import { Box, BoxProps, useTheme } from 'react-native-ficus-ui';

export const LucideIcon = ({
  icon,
  size,
  ...rest
}: Omit<LucideProps, 'filter'> & {
  icon?: LucideIconType;
} & BoxProps) => {
  const { theme } = useTheme();
  const getSize = (size?: number | string) => {
    if (typeof size === 'number') return size;
    if (size && theme?.fontSizes && size in theme?.fontSizes) {
      return theme?.fontSizes?.[size as keyof typeof theme.fontSizes];
    }
    return size;
  };
  if (!icon) return null;
  return <Box as={icon} size={getSize(size)} {...rest} />;
};
