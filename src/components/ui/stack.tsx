import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

export type StackProps = ViewProps & {
  className?: string;
  /** Spacing between children (maps to gap in Tailwind: 4→gap-1, 8→gap-2, 16→gap-4, 24→gap-6) */
  spacing?: number;
  /** Align items: center, start, end */
  align?: 'center' | 'start' | 'end' | 'stretch';
  /** Width: "100%" → w-full */
  w?: string | number;
  /** Max width in px */
  maxW?: number;
};

const spacingToClass: Record<number, string> = {
  1: 'gap-0.5',
  2: 'gap-0.5',
  4: 'gap-1',
  8: 'gap-2',
  12: 'gap-3',
  16: 'gap-4',
  24: 'gap-6',
  32: 'gap-8',
};

const alignToClass: Record<string, string> = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  stretch: 'items-stretch',
};

export const Stack = ({
  ref,
  className,
  spacing,
  align,
  w,
  maxW,
  ...props
}: StackProps & { ref?: React.RefObject<View | null> }) => {
  const classes = [
    'flex flex-col',
    spacing !== undefined && spacingToClass[spacing],
    align && alignToClass[align],
    w === '100%' && 'w-full',
    maxW !== undefined && `max-w-[${maxW}px]`,
    className,
  ];
  return <View ref={ref} className={cn(...classes)} {...props} />;
};

Stack.displayName = 'Stack';

export const VStack = Stack;

export type HStackProps = Omit<StackProps, 'align'> & {
  alignItems?: 'center' | 'start' | 'end' | 'stretch';
  justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
};

const justifyToClass: Record<string, string> = {
  center: 'justify-center',
  'space-between': 'justify-between',
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
};

export const HStack = ({
  ref,
  className,
  spacing,
  alignItems,
  justifyContent,
  w,
  maxW,
  ...props
}: HStackProps & { ref?: React.RefObject<View | null> }) => {
  const classes = [
    'flex flex-row',
    spacing !== undefined && spacingToClass[spacing],
    alignItems && alignToClass[alignItems],
    justifyContent && justifyToClass[justifyContent],
    w === '100%' && 'w-full',
    maxW !== undefined && `max-w-[${maxW}px]`,
    className,
  ];
  return <View ref={ref} className={cn(...classes)} {...props} />;
};

HStack.displayName = 'HStack';

export type CenterProps = ViewProps & {
  className?: string;
  flex?: number;
  p?: number;
  gap?: number;
  maxW?: number;
};

const pToClass: Record<number, string> = {
  16: 'p-4',
  24: 'p-6',
  32: 'p-8',
};

export const Center = ({
  ref,
  className,
  flex = 1,
  p,
  gap,
  maxW,
  ...props
}: CenterProps & { ref?: React.RefObject<View | null> }) => {
  const classes = [
    'flex items-center justify-center',
    flex === 1 && 'flex-1',
    p !== undefined && (pToClass[p] ?? `p-[${p}px]`),
    gap !== undefined && (spacingToClass[gap] ?? `gap-[${gap}px]`),
    maxW !== undefined && `max-w-[${maxW}px]`,
    className,
  ];
  return <View ref={ref} className={cn(...classes)} {...props} />;
};

Center.displayName = 'Center';
