import * as React from 'react';
import { Platform, TextInput, type TextInputProps } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

type InputProps = TextInputProps & {
  /** Use BottomSheetTextInput when inside a bottom sheet for proper keyboard handling */
  as?: React.ComponentType<TextInputProps>;
  className?: string;
  'aria-invalid'?: boolean;
};

const Input = ({
  ref,
  className,
  as: Component = TextInput,
  'aria-invalid': ariaInvalid,
  onFocus,
  onBlur,
  ...props
}: InputProps & { ref?: React.RefObject<TextInput | null> }) => {
  const hasError = ariaInvalid === true;
  const [isFocused, setIsFocused] = React.useState(false);
  const resolvedForeground = useResolveClassNames('text-foreground') as {
    color?: string;
  };
  const resolvedDestructive = useResolveClassNames('text-destructive') as {
    color?: string;
  };
  const Comp = Component as React.ComponentType<
    TextInputProps & React.RefAttributes<TextInput>
  >;

  const getFocusBorderColor = () => {
    if (hasError) return resolvedDestructive.color;
    return resolvedForeground.color;
  };

  const focusStyle =
    Platform.OS !== 'web' && isFocused
      ? { borderColor: getFocusBorderColor() }
      : undefined;

  return (
    <Comp
      ref={ref}
      aria-invalid={ariaInvalid}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      className={cn(
        'border-input bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
        props.editable === false &&
          cn(
            'opacity-50',
            Platform.select({
              web: 'disabled:pointer-events-none disabled:cursor-not-allowed',
            })
          ),
        hasError && 'border-destructive',
        Platform.select({
          web: cn(
            'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground transition-[color,box-shadow] outline-none md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/30'
          ),
          native: 'placeholder:text-muted-foreground/50',
        }),
        className
      )}
      style={focusStyle}
      {...props}
    />
  );
};

Input.displayName = 'Input';

export { Input };
