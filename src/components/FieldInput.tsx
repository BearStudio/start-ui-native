import { FieldProps, useField } from '@formiz/core';
import React, { useEffect, useState } from 'react';
import { FormGroup, FormGroupProps } from './FormGroup';
import { TextInput, TextInputProps } from 'react-native';
import { Input } from 'react-native-ficus-ui';
import { useDarkMode } from '@/theme/useDarkMode';

type FieldInputProps = FieldProps &
  Omit<FormGroupProps, 'id'> & { componentProps?: TextInputProps };

export const FieldInput = React.forwardRef<TextInput, FieldInputProps>(
  (props, ref) => {
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
          borderColor={showError ? 'red500' : 'gray300'}
          borderWidth={2}
          color={colorModeValue('black', 'gray.100')}
          bg={colorModeValue('gray.50', 'gray.600')}
          my={5}
          {...componentProps}
        />
      </FormGroup>
    );
  }
);
