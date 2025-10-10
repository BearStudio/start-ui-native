import { AnyFormApi } from '@tanstack/react-form';

import { formContext as FormContext } from '@/lib/tanstack-form/context';

export const Form = (
  props: React.PropsWithChildren<{
    form: AnyFormApi;
    className?: string;
  }>
) => {
  return <FormContext value={props.form}>{props.children}</FormContext>;
};
