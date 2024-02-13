import React, { ForwardedRef, useEffect, useState } from 'react';

import { FieldProps, useField } from '@formiz/core';
import { TextInput, TextInputProps } from 'react-native';
import { View } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import { Box, Center, Text } from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';
import { useDarkMode } from '@/theme/useDarkMode';

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
          <CodeField
            ref={ref}
            value={value ?? ''}
            onChangeText={setValue}
            cellCount={codeLength}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
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
            {...componentProps}
          />
        </Box>
      </FormGroup>
    );
  }
);
