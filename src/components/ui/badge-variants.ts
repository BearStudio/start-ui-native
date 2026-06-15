import { cva } from 'class-variance-authority';
import { Platform } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export const badgeVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-full border border-border px-2 py-0.5',
    Platform.select({
      web: 'w-fit whitespace-nowrap transition-colors transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 [&>svg]:pointer-events-none [&>svg]:size-3',
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'border-transparent bg-primary',
          Platform.select({ web: '[a&]:hover:bg-primary/90' })
        ),
        secondary: cn(
          'border-transparent bg-secondary',
          Platform.select({ web: '[a&]:hover:bg-secondary/90' })
        ),
        destructive: cn(
          'border-transparent bg-destructive',
          Platform.select({ web: '[a&]:hover:bg-destructive/90' })
        ),
        outline: Platform.select({
          web: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        }),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const badgeTextVariants = cva('text-xs font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-white',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
