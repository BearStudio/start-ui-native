import { ReactNode, useEffect, useId } from 'react';
import { View } from 'react-native';

import { useFieldContext } from '@/lib/tanstack-form/context';

type FormFieldSize = 'sm' | 'default' | 'lg';

export type FieldContextMeta = ReturnType<
  ReturnType<typeof useFieldContext>['getMeta']
> & {
  id: string;
  descriptionId: string;
  errorId: string;
  size?: FormFieldSize;
};

export const FormField = (props: {
  id?: string;
  size?: FormFieldSize;
  children?: ReactNode;
}) => {
  const defaultId = useId();
  const id = props.id ?? defaultId;

  const field = useFieldContext();

  const setFieldMeta = field.setMeta;

  useEffect(() => {
    setFieldMeta((meta) => ({
      ...meta,
      id,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      size: props.size,
    }));
  }, [setFieldMeta, id, props.size]);

  return <View className="gap-1">{props.children}</View>;
};
