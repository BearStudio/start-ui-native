import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

import {
  buttonTextVariants,
  buttonVariants,
} from '@/components/ui/button-variants';
import { Text, TextClassContext } from '@/components/ui/text';

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function ButtonText({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <Text className={className}>{children}</Text>;
}

function Button({
  className,
  variant,
  size,
  children,
  style,
  ...props
}: ButtonProps) {
  const content =
    typeof children === 'string' ? (
      <Button.Text>{children}</Button.Text>
    ) : (
      children
    );

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
        accessibilityRole="button"
        role="button"
        {...props}
      >
        {content}
      </Pressable>
    </TextClassContext>
  );
}

Button.Text = ButtonText;

export { Button };
export type { ButtonProps };
