import {
  ComponentType,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { FieldProps, useField } from '@formiz/core';
import { Dot } from 'lucide-react-native';
import { TextInput, View } from 'react-native';
import { Cursor } from 'react-native-confirmation-code-field';
import {
  Box,
  Center,
  Dict,
  PinInput,
  PinInputProps,
  Text,
  useTheme,
} from 'react-native-ficus-ui';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

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

export const FieldCodeInput = forwardRef(
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
      isRequired,
    } = useField(props);
    const { label, pinInputProps, codeLength, ...rest } = otherProps;
    const {
      theme: { colors },
    } = useTheme();
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
        isRequired={isRequired}
        {...rest}
      >
        <Box mb={16} maxW={250} mt="xs">
          <PinInput
            ref={ref}
            value={value ?? ''}
            onChangeText={setValue}
            cellCount={codeLength}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            rootStyle={{
              justifyContent: 'flex-start',
              height: 40,
            }}
            {...pinInputProps}
            renderCell={({ index, symbol, isFocused }) => {
              const isFirstCell = index === 0;
              const isLastCell = index === codeLength - 1;
              const isCurrentCell = index === (value || '')?.length + 1;
              const isEmptyFirstCell =
                (value || '')?.length === 0 && isFirstCell && !isFocused;

              const borderRadius = isFirstCell || isLastCell ? 'lg' : 0;
              const borderRightWidth = isLastCell || isEmptyFirstCell ? 1 : 0;
              const borderLeftWidth = isCurrentCell ? 0 : 1;

              const getBorderColor = (
                isFocused: boolean,
                showError: boolean
              ) => {
                if (showError) return 'red.500';
                if (isFocused) return 'neutral.200';
                return 'gray.200';
              };

              const getBorderColorDark = (
                isFocused: boolean,
                showError: boolean
              ) => {
                if (showError) return 'red.300';
                if (isFocused) return 'neutral.700';
                return 'neutral.800';
              };

              const borderColor = getBorderColor(isFocused, showError);
              const borderColorDark = getBorderColorDark(isFocused, showError);

              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    aspectRatio: 2 / 1.8,
                  }}
                >
                  <Center
                    bg="white"
                    _dark={{
                      bg: 'neutral.950',
                      borderColor: borderColorDark,
                    }}
                    flex={1}
                    boxShadow={isFocused ? 'xl' : 'none'}
                    borderRadius={borderRadius}
                    borderRightRadius={isLastCell ? 'lg' : 0}
                    borderLeftRadius={isFirstCell ? 'lg' : 0}
                    borderWidth={isFocused ? 3 : 1}
                    borderRightWidth={isFocused ? 3 : borderRightWidth}
                    borderLeftWidth={isFocused ? 3 : borderLeftWidth}
                    borderColor={borderColor}
                  >
                    {(!!symbol || isFocused) && (
                      <Text
                        color="gray.800"
                        _dark={{ color: 'neutral.50' }}
                        fontFamily="Nunito-Bold"
                        fontSize="lg"
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                    {!symbol && !isFocused && (
                      <Dot color={(colors?.gray as Dict)[400]} />
                    )}
                  </Center>
                </View>
              );
            }}
          />
        </Box>
      </FormGroup>
    );
  }
);
