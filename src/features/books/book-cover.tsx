import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, type ViewProps } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { BookGetByIdResponse } from '@/lib/hey-api/generated';
import { cn } from '@/lib/tailwind/utils';

import { Text } from '@/components/ui/text';

export const BOOK_COVER_ASPECT_RATIO = 2 / 3;

export type BookCoverProps = ViewProps & {
  book: BookGetByIdResponse;
};

export const BookCover = ({
  book,
  className,
  style,
  ...props
}: BookCoverProps) => {
  const { t } = useTranslation(['books']);
  const svgId = useId().replaceAll(':', '');

  return (
    <View
      className={cn('rounded-sm shadow-2xl shadow-black/25', className)}
      style={[{ aspectRatio: BOOK_COVER_ASPECT_RATIO }, style]}
      {...props}
    >
      <View
        className="relative flex-1 overflow-hidden rounded-sm bg-neutral-800"
        style={{ backgroundColor: book.genre?.color ?? '#333' }}
      >
        <Svg
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          viewBox="0 0 200 300"
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id={`${svgId}-spine`} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="black" stopOpacity={0} />
              <Stop offset="1" stopColor="black" stopOpacity={0.1} />
            </LinearGradient>
            <LinearGradient
              id={`${svgId}-highlight`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <Stop offset="0" stopColor="white" stopOpacity={0} />
              <Stop offset="1" stopColor="white" stopOpacity={0.2} />
            </LinearGradient>
            <RadialGradient id={`${svgId}-light`} cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="white" stopOpacity={0.4} />
              <Stop offset="0.55" stopColor="white" stopOpacity={0.22} />
              <Stop offset="1" stopColor="white" stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`${svgId}-shade`} cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="black" stopOpacity={0.4} />
              <Stop offset="0.55" stopColor="black" stopOpacity={0.22} />
              <Stop offset="1" stopColor="black" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="150" cy="37.5" r="75" fill={`url(#${svgId}-light)`} />
          <Circle cx="50" cy="262.5" r="75" fill={`url(#${svgId}-shade)`} />
          <Rect
            x="0"
            y="0"
            width="10"
            height="300"
            fill={`url(#${svgId}-spine)`}
          />
          <Rect
            x="10"
            y="0"
            width="4"
            height="300"
            fill={`url(#${svgId}-highlight)`}
          />
          <Rect
            x="14"
            y="0"
            width="4"
            height="300"
            fill={`url(#${svgId}-highlight)`}
          />
        </Svg>
        <View className="relative flex-1 justify-between p-[10%] pl-[16%]">
          <Text className="text-sm leading-tight font-bold text-white">
            {book.title}
          </Text>
          <Text className="text-xs text-white/60">
            {t('books:common.byCapitalized')} {book.author}
          </Text>
        </View>
      </View>
    </View>
  );
};
