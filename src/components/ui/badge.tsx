import * as Slot from '@rn-primitives/slot';
import { type VariantProps } from 'class-variance-authority';
import { View, ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

import {
  badgeTextVariants,
  badgeVariants,
} from '@/components/ui/badge-variants';
import { TextClassContext } from '@/components/ui/text';

type BadgeProps = ViewProps &
  React.RefAttributes<View> & {
    asChild?: boolean;
  } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext>
  );
}

export { Badge };
export type { BadgeProps };
