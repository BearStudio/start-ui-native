import * as AvatarPrimitive from '@rn-primitives/avatar';
import { Text } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const sizeClasses = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
} as const;

type AvatarRootProps = AvatarPrimitive.RootProps &
  React.RefAttributes<AvatarPrimitive.RootRef>;

function Avatar({ className, ...props }: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.ImageProps & React.RefAttributes<AvatarPrimitive.ImageRef>) {
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.FallbackProps &
  React.RefAttributes<AvatarPrimitive.FallbackRef>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex size-full flex-row items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
}

type AvatarWithFallbackProps = Omit<AvatarRootProps, 'alt'> & {
  name: string;
  size?: keyof typeof sizeClasses;
  image?: string | null;
};

function AvatarWithFallback({
  name,
  size = 'sm',
  image,
  className,
  ...props
}: AvatarWithFallbackProps) {
  const sizeClass = sizeClasses[size];
  return (
    <Avatar alt={name} className={cn(sizeClass, className)} {...props}>
      {image ? <AvatarImage source={{ uri: image }} /> : null}
      <AvatarFallback>
        <Text className="text-xs font-medium text-muted-foreground">
          {getInitials(name)}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback };
