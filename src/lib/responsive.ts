import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/** Uniwind default breakpoints: https://docs.uniwind.dev/breakpoints */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const BREAKPOINT_ORDER = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export type Breakpoint = (typeof BREAKPOINT_ORDER)[number];

export type ResponsiveValue<T> =
  | T
  | ({ default: T } & Partial<Record<Breakpoint, T>>);

const isResponsiveObject = <T>(
  value: ResponsiveValue<T>
): value is { default: T } & Partial<Record<Breakpoint, T>> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  'default' in value;

export const resolveResponsiveValue = <T>(
  width: number,
  value: ResponsiveValue<T>
): T => {
  if (!isResponsiveObject(value)) {
    return value;
  }

  let resolved = value.default;

  for (const breakpoint of BREAKPOINT_ORDER) {
    const candidate = value[breakpoint];
    if (candidate !== undefined && width >= BREAKPOINTS[breakpoint]) {
      resolved = candidate;
    }
  }

  return resolved;
};

export const getBreakpoint = (width: number): Breakpoint | 'default' => {
  let current: Breakpoint | 'default' = 'default';

  for (const breakpoint of BREAKPOINT_ORDER) {
    if (width >= BREAKPOINTS[breakpoint]) {
      current = breakpoint;
    }
  }

  return current;
};

export const useResponsiveValue = <T>(value: ResponsiveValue<T>) => {
  const { width } = useWindowDimensions();

  return useMemo(() => resolveResponsiveValue(width, value), [value, width]);
};

export const useBreakpoint = () => {
  const { width } = useWindowDimensions();

  return useMemo(() => getBreakpoint(width), [width]);
};
