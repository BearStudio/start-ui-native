import { getUiState } from '@bearstudio/ui-state';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

import { Text, TextClassContext } from '@/components/ui/text';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none',
    Platform.select({
      web: "whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary shadow-sm shadow-black/5 active:bg-primary/90',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        destructive: cn(
          'bg-destructive shadow-sm shadow-black/5 active:bg-destructive/90',
          Platform.select({
            web: 'hover:bg-destructive/90 focus-visible:ring-destructive/30',
          })
        ),
        outline: cn(
          'border border-border bg-background shadow-sm shadow-black/5 active:bg-accent',
          Platform.select({
            web: 'hover:bg-accent',
          })
        ),
        secondary: cn(
          'border border-border bg-background shadow-xs',
          Platform.select({ web: 'hover:bg-accent' })
        ),
        ghost: cn(
          'active:bg-accent',
          Platform.select({ web: 'hover:bg-accent' })
        ),
        link: '',
      },
      size: {
        default: cn(
          'h-10 px-4 py-2 sm:h-9',
          Platform.select({ web: 'has-[>svg]:px-3' })
        ),
        sm: cn(
          'h-9 gap-1.5 rounded-md px-3 sm:h-8',
          Platform.select({ web: 'has-[>svg]:px-2.5' })
        ),
        lg: cn(
          'h-11 rounded-md px-6 sm:h-10',
          Platform.select({ web: 'has-[>svg]:px-4' })
        ),
        icon: 'h-10 w-10 sm:h-9 sm:w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-sm font-medium text-foreground',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: cn(
          'group-active:text-accent-foreground',
          Platform.select({ web: 'group-hover:text-accent-foreground' })
        ),
        secondary: cn(
          'text-secondary-foreground',
          Platform.select({ web: 'hover:text-accent-foreground' })
        ),
        ghost: 'group-active:text-accent-foreground',
        link: cn(
          'text-primary group-active:underline',
          Platform.select({
            web: 'underline-offset-4 group-hover:underline hover:underline',
          })
        ),
      },
      size: {
        default: 'text-sm',
        xs: 'text-xs',
        sm: 'text-sm',
        lg: 'text-sm',
        icon: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  children,
  style,
  ...props
}: ButtonProps) {
  const content = getUiState((set) => {
    if (typeof children === 'function') return set('function', { children });
    if (!children) return set('empty');
    if (Array.isArray(children))
      return set('array', {
        children: children.map((child) =>
          typeof child === 'string' || typeof child === 'number' ? (
            <Text key={String(child)}>{child}</Text>
          ) : (
            child
          )
        ),
      });
    if (typeof children === 'string' || typeof children === 'number')
      return set('text', { children });

    return set('default', { children });
  });
  return (
    <TextClassContext value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && 'opacity-50',
          buttonVariants({ variant, size }),
          className
        )}
        style={(state) => [
          state.pressed && { opacity: 0.7 },
          typeof style === 'function' ? style(state) : style,
        ]}
        role="button"
        {...props}
      >
        {content
          .match('function', ({ children }) => children)
          .match('text', ({ children }) => <Text>{children}</Text>)
          .match('array', ({ children }) =>
            children.map((child, index) =>
              typeof child === 'string' || typeof child === 'number' ? (
                // eslint-disable-next-line @eslint-react/no-array-index-key
                <Text key={String(child) + index}>{child}</Text>
              ) : (
                child
              )
            )
          )
          .match('empty', () => null)
          .match('default', ({ children }) => children)
          .exhaustive()}
      </Pressable>
    </TextClassContext>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
