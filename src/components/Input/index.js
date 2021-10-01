import React from 'react';

import { Input as MagnusInput } from 'react-native-magnus';

const Input = React.forwardRef(({ ...otherProps }, ref) => (
  <MagnusInput ref={ref} p={10} focusBorderColor="blue700" {...otherProps} />
));

export default Input;
