import { useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

interface UseReactNativeEffectParams {
  onMount?: () => void;
  onUnmount?: () => void;
}
// this custom hook is used to handle event on the focus and blur events
// when the the page of react navigation is mounted and unmounted.
export const useReactNativeEffect = ({
  onMount,
  onUnmount,
}: UseReactNativeEffectParams = {}): { isScreenFocused?: boolean } => {
  const [isScreenFocused, setIsScreenFocused] = useState(true);
  const onMountRef = useRef(onMount);
  const onUnmountRef = useRef(onUnmount);

  useFocusEffect(() => {
    setIsScreenFocused(true); // when i focus the screen
    return () => setIsScreenFocused(false); // when i blur the screen
  });

  useEffect(() => {
    if (isScreenFocused && onMountRef.current) {
      onMountRef.current();
    }
    if (!isScreenFocused && onUnmountRef.current) {
      onUnmountRef.current();
    }
  }, [isScreenFocused]);

  return { isScreenFocused };
};
