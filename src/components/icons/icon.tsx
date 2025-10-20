import { LucideIcon } from 'lucide-react-native';
import { ficus, StyleProps } from 'react-native-ficus-ui';

export const Icon = ({
  icon,
  size,
  ...props
}: StyleProps & {
  icon: LucideIcon;
  color?: string;
  size?: number;
}) => {
  const FicusLucideIcon = ficus(icon);
  return (
    <FicusLucideIcon
      {...props}
      {...(size ? { height: size, width: size } : {})}
    />
  );
};
