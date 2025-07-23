import { LucideIcon as LucideIconType, LucideProps } from 'lucide-react-native';
import { Box, BoxProps } from 'react-native-ficus-ui';

export const LucideIcon = ({
  icon,
  ...rest
}: Omit<LucideProps, 'filter'> & {
  icon?: LucideIconType;
} & BoxProps) => {
  if (!icon) return null;
  return <Box as={icon} {...rest} />;
};
