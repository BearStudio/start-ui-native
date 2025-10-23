import { getUiState } from '@bearstudio/ui-state';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  Pressable,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm',
        outline: 'border-2 border-border bg-background text-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm',
        ghost: 'text-foreground',
        link: 'text-primary underline',
        selection: 'border-2 border-border bg-background',
      },
      size: {
        default: 'h-12 px-4',
        sm: 'h-10 px-3',
        lg: 'h-14 px-6',
        icon: 'h-12 w-12',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'selection',
        selected: true,
        className: 'border-primary bg-primary/5',
      },
      {
        variant: 'outline',
        selected: true,
        className: 'border-primary ring-1 ring-primary/20',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      selected: false,
    },
  }
);

export interface ButtonProps
  extends Omit<RNPressableProps, 'style'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
  selected?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  selected,
  children: _children,
  ref,
  ...props
}: ButtonProps & {
  ref?: React.Ref<View> | null;
}) => {
  const ui = getUiState((set) => {
    if (typeof _children === 'function')
      return set('function', { children: _children });
    if (typeof _children === 'string')
      return set('string', { children: _children });

    return set('default', { children: _children });
  });

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, selected, className }))}
      ref={ref}
      {...props}
    >
      {(state: PressableStateCallbackType) => (
        <View
          className={`flex-row items-center justify-center gap-2 ${
            state.pressed ? 'opacity-80' : ''
          }`}
        >
          {ui
            .match('function', ({ children }) => children(state))
            .match('string', ({ children }) => (
              <Text className="text-accent">{children}</Text>
            ))
            .match('default', ({ children }) => children)
            .exhaustive()}
        </View>
      )}
    </Pressable>
  );
};

Button.displayName = 'Button';

export { Button };
