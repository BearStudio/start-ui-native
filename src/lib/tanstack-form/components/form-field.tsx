import { ReactNode, useEffect, useId } from 'react';
import { Box } from 'react-native-ficus-ui';

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
  const _id = useId();
  const id = props.id ?? _id;

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

  return <Box gap={4}>{props.children}</Box>;
};
