import React, { ComponentType, ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput, View } from 'react-native';
import { Cursor } from 'react-native-confirmation-code-field';
import {
  Box,
  Center,
  PinInput,
  PinInputProps,
  Text,
} from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

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

    const { colorModeValue } = useDarkMode();

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
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index}>
                <Center
                  bg={colorModeValue('gray.300', 'gray.600')}
                  w={40}
                  h={40}
                  borderRadius="md"
                  borderWidth={isFocused || showError ? 2 : 0}
                  borderColor={showError ? 'red.500' : 'brand.500'}
                >
                  <Text
                    color={colorModeValue('black', 'gray.100')}
                    fontWeight="bold"
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </Center>
              </View>
            )}
          />
        </Box>
      </FormGroup>
    );
  }
);
