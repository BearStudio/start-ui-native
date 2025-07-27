import React, { ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput } from 'react-native';
import { Input, InputProps, useColorModeValue } from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

export type FieldInputProps<FormattedValue = string> = FieldProps<
  string,
  FormattedValue
> &
  Omit<FormGroupProps, 'id'> & {
    componentProps?: InputProps;
    InputComponent?: React.ElementType;
  };

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

    const InputComponentObj = props.InputComponent || Input;

    return (
      <FormGroup
        id={id}
        errorMessage={errorMessage}
        showError={showError}
        label={label}
        {...rest}
      >
        <InputComponentObj
          ref={ref}
          id={id}
          value={value ?? ''}
          onChangeText={setValue}
          onBlur={handleBlur}
          my={5}
          placeholderTextColor={useColorModeValue('neutral.600', 'white')}
          {...componentProps}
        />
      </FormGroup>
    );
  }
);
