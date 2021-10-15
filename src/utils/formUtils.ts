import { MutableRefObject } from 'react';

import { TextInput } from 'react-native';

export const focus = (elementToFocusRef: MutableRefObject<TextInput>) => (
  event
) => {
  if (event) {
    event.preventDefault();
  }
  elementToFocusRef?.current?.focus?.();
};
