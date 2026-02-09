import * as React from 'react';
import { Platform, TextInput, View } from 'react-native';

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
  ref,
  ...props
}: PinInputProps) => {
  const innerRef = React.useRef<TextInput>(null);

  React.useImperativeHandle(ref, () => innerRef.current as TextInput, []);

  const digits = React.useMemo(
    () => value.padEnd(cellCount, ' ').split('').slice(0, cellCount),
    [value, cellCount]
  );

  return (
    <View
      className={cn('relative flex flex-row gap-2', className)}
      onTouchEnd={() => innerRef.current?.focus()}
    >
      {digits.map((digit, index) => (
        <View
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`pin-input-cell-${index}`}
          className={cn(
            'border-input bg-background flex min-w-0 flex-1 items-center justify-center rounded-md border py-2',
            props['aria-invalid'] && 'border-destructive',
            Platform.select({
              web: 'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
            })
          )}
        >
          <Text className="text-lg font-medium tabular-nums">
            {digit === ' ' ? '' : digit}
          </Text>
        </View>
      ))}
      <Input
        ref={innerRef}
        className="absolute inset-0 opacity-0"
        value={value}
        onChangeText={(text) => {
          const filtered = text.replace(/\D/g, '').slice(0, cellCount);
          onChangeText?.(filtered);
        }}
        keyboardType={keyboardType}
        textContentType={textContentType}
        maxLength={cellCount}
        editable={editable}
        {...props}
      />
    </View>
  );
};

PinInput.displayName = 'PinInput';

export { PinInput };
export type { PinInputProps };
