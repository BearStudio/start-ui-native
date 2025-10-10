import {
  createFormHook,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
} from '@tanstack/react-form';
import { lazy } from 'react';

import {
  FormField,
  FormFieldError,
  FormFieldHelper,
  FormFieldLabel,
} from '@/lib/tanstack-form/components';
import FormSubmit from '@/lib/tanstack-form/components/form-submit';
import { fieldContext, formContext } from '@/lib/tanstack-form/context';

const FieldText = lazy(() => import('@/components/form/field-text'));
const FieldOtp = lazy(() => import('@/components/form/field-otp'));

const { useAppForm, withForm: _withForm } = createFormHook({
  fieldComponents: {
    Label: FormFieldLabel,
    Field: FormField,
    Helper: FormFieldHelper,
    Error: FormFieldError,
    FieldText,
    FieldOtp,
  },
  formComponents: { Submit: FormSubmit },
  fieldContext,
  formContext,
});

// Shortcuts generics type to only essential
const withForm = <Fields, Props extends object = object>(
  params: Parameters<
    typeof _withForm<
      Fields,
      FormValidateOrFn<Fields> | undefined,
      FormValidateOrFn<Fields> | undefined,
      FormAsyncValidateOrFn<Fields> | undefined,
      FormValidateOrFn<Fields> | undefined,
      FormAsyncValidateOrFn<Fields> | undefined,
      FormValidateOrFn<Fields> | undefined,
      FormAsyncValidateOrFn<Fields> | undefined,
      FormValidateOrFn<Fields> | undefined,
      FormAsyncValidateOrFn<Fields> | undefined,
      FormAsyncValidateOrFn<Fields> | undefined,
      unknown,
      Props
    >
  >[0]
) =>
  _withForm<
    Fields,
    FormValidateOrFn<Fields> | undefined,
    FormValidateOrFn<Fields> | undefined,
    FormAsyncValidateOrFn<Fields> | undefined,
    FormValidateOrFn<Fields> | undefined,
    FormAsyncValidateOrFn<Fields> | undefined,
    FormValidateOrFn<Fields> | undefined,
    FormAsyncValidateOrFn<Fields> | undefined,
    FormValidateOrFn<Fields> | undefined,
    FormAsyncValidateOrFn<Fields> | undefined,
    FormAsyncValidateOrFn<Fields> | undefined,
    unknown,
    Props
  >(params);

export { useAppForm, withForm };
