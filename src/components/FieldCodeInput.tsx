import React, { ComponentType, ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput } from 'react-native';
import { Box, PinInput, PinInputProps } from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from './FormGroup';

type FieldCodeInputProps<FormattedValue = string> = FieldProps<
  string,
  FormattedValue
> &
  Omit<FormGroupProps, 'id'> & {
    codeLength: number;
    pinInputProps?: PinInputProps & {
      InputComponent?: ComponentType<never>;
    };
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
    const { label, pinInputProps, codeLength, ...rest } = otherProps;

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
            cellCount={codeLength}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            {...pinInputProps}
          />
        </Box>
      </FormGroup>
    );
  }
);
