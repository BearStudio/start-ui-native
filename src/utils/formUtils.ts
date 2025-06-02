import { RefObject } from 'react';

import { TextInput } from 'react-native';

export const focus =
  (elementToFocusRef: RefObject<TextInput | null>) =>
  (event: { preventDefault: () => void }) => {
    if (event) {
      event.preventDefault();
    }
    elementToFocusRef?.current?.focus?.();
  };
