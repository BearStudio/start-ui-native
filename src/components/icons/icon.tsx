import type { StyleProp } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

type IconProps = {
  icon: React.ComponentType<{ style: StyleProp<ExplicitAny> }>;
  className?: string;
};

export const Icon = ({ icon: IconComponent, className }: IconProps) => {
  const styles = useResolveClassNames(cn('text-primary size-4', className));

  return <IconComponent style={styles} />;
};
