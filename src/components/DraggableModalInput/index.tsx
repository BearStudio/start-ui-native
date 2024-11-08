import { FC, useCallback, useEffect } from 'react';

import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Input, InputProps } from 'react-native-ficus-ui';

export const DraggableModalInput: FC<InputProps> = ({
  onFocus,
  onBlur,
  ...rest
}) => {
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents]
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents]
  );

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  return <Input onFocus={handleOnFocus} onBlur={handleOnBlur} {...rest} />;
};
