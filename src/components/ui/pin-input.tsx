import * as React from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

type PinInputProps = React.ComponentProps<typeof Input> & {
  /** Number of pin cells */
  cellCount?: number;
};

const PinInput = ({
  cellCount = 6,
  className,
  value = '',
  onChangeText,
  keyboardType = 'number-pad',
  textContentType = 'oneTimeCode',
  editable = true,
  autoFocus,
  testID,
  ref,
  ...props
}: PinInputProps) => {
  const innerRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const resolvedForeground = useResolveClassNames('text-foreground') as {
    color?: string;
  };
  const resolvedDestructive = useResolveClassNames('text-destructive') as {
    color?: string;
  };
  const hasError = props['aria-invalid'] === true;

  React.useImperativeHandle(ref, () => innerRef.current as TextInput, []);

  const cells = React.useMemo(() => {
    const digits = value.padEnd(cellCount, ' ').split('').slice(0, cellCount);
    return digits.map((digit, i) => ({
      id: `pin-cell-${i}` as const,
      digit,
    }));
  }, [value, cellCount]);

  const activeIndex = Math.min(value.length, cellCount - 1);

  const getFocusBorderColor = () => {
    if (hasError) return resolvedDestructive.color;
    return resolvedForeground.color;
  };

  return (
    <Pressable
      testID={testID}
      className={cn('relative flex flex-row gap-2', className)}
      onPress={() => {
        innerRef.current?.blur();
        setTimeout(() => innerRef.current?.focus(), 0);
      }}
    >
      {cells.map(({ id, digit }, index) => (
        <View
          key={id}
          className={cn(
            'flex min-w-0 flex-1 items-center justify-center rounded-md border border-input bg-background py-2',
            hasError && 'border-destructive',
            Platform.select({
              web: 'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
            })
          )}
          style={
            Platform.OS !== 'web' && isFocused && index === activeIndex
              ? { borderColor: getFocusBorderColor() }
              : undefined
          }
        >
          <Text className="text-lg leading-7 font-medium tabular-nums">
            {digit === ' ' ? '\u200B' : digit}
          </Text>
        </View>
      ))}
      <TextInput
        ref={innerRef}
        autoFocus={autoFocus}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => {
          const filtered = text.replace(/\D/g, '').slice(0, cellCount);
          onChangeText?.(filtered);
        }}
        keyboardType={keyboardType}
        textContentType={textContentType}
        maxLength={cellCount}
        editable={editable}
        caretHidden
        style={{
          position: 'absolute',
          opacity: 0,
          width: 1,
          height: 1,
        }}
      />
    </Pressable>
  );
};

PinInput.displayName = 'PinInput';

export { PinInput };
export type { PinInputProps };
