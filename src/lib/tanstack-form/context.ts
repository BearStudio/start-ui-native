import {
  createFormHookContexts,
  ReactFormExtendedApi,
} from '@tanstack/react-form';

const {
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext: useTanstackFormContext,
} = createFormHookContexts();

const useFormContext = <Fields extends Record<string, unknown>>() => {
  const form = useTanstackFormContext();

  return form as unknown as ReactFormExtendedApi<
    Fields,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  >;
};

// type WithForm<Fields, Props> = <
// Fields,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   Props
// >

export { fieldContext, formContext, useFieldContext, useFormContext };
