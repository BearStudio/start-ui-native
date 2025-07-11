import React, { ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput, TextInputProps } from 'react-native';
import { Box, PinInput } from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

type FieldCodeInputProps<FormattedValue = string> = FieldProps<
  string,
  FormattedValue
> &
  Omit<FormGroupProps, 'id'> & {
    componentProps?: TextInputProps;
    codeLength: number;
  };

export const FieldCodeInput = React.forwardRef(
  <FormattedValue = string,>(
    props: FieldCodeInputProps<FormattedValue>,
    ref: ForwardedRef<TextInput>
  ) => {
    const {
      id,
      value,
      setValue,
      errorMessage,
      isSubmitted,
      isValid,
      resetKey,
      otherProps,
    } = useField(props);
    const { label, componentProps, codeLength, ...rest } = otherProps;

    const [isTouched, setIsTouched] = useState(false);
    const showError = !isValid && (isTouched || isSubmitted);

    useEffect(() => {
      setIsTouched(false);
    }, [resetKey]);

    return (
      <FormGroup
        id={id}
        errorMessage={errorMessage}
        showError={showError}
        label={label}
        style={{ height: 65 }}
        {...rest}
      >
        <Box mb="sm">
          <PinInput
            ref={ref}
            value={value ?? ''}
            onChangeText={setValue}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            cellCount={codeLength}
            {...componentProps}
          />
        </Box>
      </FormGroup>
    );
  }
);
