import React, { ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput, TextInputProps } from 'react-native';
import { Input } from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';
import { useDarkMode } from '@/theme/useDarkMode';

export type FieldInputProps<FormattedValue = string> = FieldProps<
  string,
  FormattedValue
> &
  Omit<FormGroupProps, 'id'> & { componentProps?: TextInputProps };

export const FieldInput = React.forwardRef(
  <FormattedValue = string,>(
    props: FieldInputProps<FormattedValue>,
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
    const { label, componentProps, ...rest } = otherProps;

    const [isTouched, setIsTouched] = useState(false);
    const showError = !isValid && (isTouched || isSubmitted);

    useEffect(() => {
      setIsTouched(false);
    }, [resetKey]);

    const handleBlur = () => {
      if (isTouched) {
        return;
      }
      setIsTouched(true);
    };

    const { colorModeValue } = useDarkMode();

    return (
      <FormGroup
        id={id}
        errorMessage={errorMessage}
        showError={showError}
        label={label}
        {...rest}
      >
        <Input
          ref={ref}
          id={id}
          value={value ?? ''}
          onChangeText={setValue}
          onBlur={handleBlur}
          focusBorderColor="brand.500"
          borderColor={
            showError ? 'error.500' : colorModeValue('gray.300', 'gray.500')
          }
          borderWidth={1}
          color={colorModeValue('black', 'gray.100')}
          bg={colorModeValue('white', 'gray.700')}
          placeholderTextColor={colorModeValue('gray.900', 'gray.50')}
          my={5}
          {...componentProps}
        />
      </FormGroup>
    );
  }
);
