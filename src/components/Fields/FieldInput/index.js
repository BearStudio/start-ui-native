import React, { useEffect, useState } from 'react';

import { useField } from '@formiz/core';
import { FormControl, Stack, Input } from 'native-base';

export const FieldInput = React.forwardRef((props, ref) => {
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
    <FormControl
      isRequired={!!required}
      isInvalid={showError}
      isDisabled={isDisabled}
    >
      <Stack>
        {!!label && <FormControl.Label>{label}</FormControl.Label>}
        <Input
          ref={ref}
          id={id}
          type={type || 'text'}
          value={value ?? ''}
          onChangeText={setValue}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...otherProps}
        />
        {!!helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
        {showError && (
          <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        )}
      </Stack>
    </FormControl>
  );
});
