import { FieldProps, useField } from '@formiz/core';
import React, { useEffect, useState } from 'react';
import { FormGroup, FormGroupProps } from './FormGroup';
import { TextInput, TextInputProps } from 'react-native';
import { Input } from 'react-native-magnus';

type FieldInputProps = FieldProps & Omit<FormGroupProps, 'id'> & TextInputProps;

export const FieldInput = React.forwardRef<TextInput, FieldInputProps>(
  (props, ref) => {
    const { label, placeholder } = props;
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

    return (
      <FormGroup
        id={id}
        errorMessage={errorMessage}
        showError={showError}
        label={label}
      >
        <Input
          ref={ref}
          id={id}
          value={value ?? ''}
          onChangeText={setValue}
          onBlur={handleBlur}
          placeholder={placeholder}
          focusBorderColor="primary500"
          borderColor={showError ? 'red500' : 'gray300'}
          borderWidth={2}
          my={5}
          {...otherProps}
        />
      </FormGroup>
    );
  }
);
