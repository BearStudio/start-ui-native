import React, {useEffect, useState} from 'react';
import {useField} from '@formiz/core';
import Input from '../../Input';
import {Div, Text} from 'react-native-magnus';

export const FieldInput = (props) => {
  const {
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
    errorMessage,
  } = useField(props);

  const {
    label,
    helper,
    placeholder,
    type,
    isDisabled,
    required,
    formatValue,
    keepValue,
    asyncValidations,
    ...otherProps
  } = props;

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
    <Div>
      <Text
        {...(showError ? {fontWeight: 'bold'} : {})}
        mt={10}
        color={showError ? 'red700' : 'text'}>
        {label}
      </Text>
      <Input
        id={id}
        type={type || 'text'}
        value={value ?? ''}
        onChangeText={setValue}
        onBlur={handleBlur}
        placeholder={placeholder}
        {...(showError ? {borderColor: 'red700', borderWidth: 1} : {})}
        {...otherProps}
      />
      {showError && (
        <Text {...(showError ? {color: 'red700'} : {})}>{errorMessage}</Text>
      )}
    </Div>
  );
};
