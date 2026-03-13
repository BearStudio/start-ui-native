import type { StyleProp, ViewStyle } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

type IconProps = {
  icon: React.ComponentType<
    {
      style?: StyleProp<ExplicitAny>;
      width?: number;
      height?: number;
    } & Record<string, unknown>
  >;
  className?: string;
};

export const Icon = ({ icon: IconComponent, className }: IconProps) => {
  const resolved = useResolveClassNames(
    cn('size-4 text-foreground', className)
  ) as ViewStyle;

  const { width, height, ...style } = resolved;

  return (
    <IconComponent
      style={style}
      {...(typeof width === 'number' && { width })}
      {...(typeof height === 'number' && { height })}
    />
  );
};
