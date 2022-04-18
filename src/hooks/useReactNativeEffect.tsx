import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';

interface UseReactNativeEffectParams {
  onMount?: () => void;
  onUnmount?: () => void;
}

export const useReactNativeEffect = ({
  onMount,
  onUnmount,
}: UseReactNativeEffectParams = {}) => {
  const navigation = useNavigation();
  const [isScreenFocused, setIsScreenFocused] = useState(true);

  // on mount
  useEffect(() => {
    onMount?.();
    setIsScreenFocused(true);
    return () => onUnmount?.();
  }, [onMount, onUnmount]);

  // When screen focuses
  useEffect(() => {
    return navigation.addListener('focus', () => {
      onMount?.();
      setIsScreenFocused(true);
    });
  }, [navigation, onMount]);

  // When screen blurs
  useEffect(() => {
    return navigation.addListener('blur', () => {
      onUnmount?.();
      setIsScreenFocused(false);
    });
  }, [navigation, onUnmount]);

  return { isScreenFocused };
};
