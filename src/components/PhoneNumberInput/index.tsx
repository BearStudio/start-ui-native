import React from 'react';

import { Input, Select } from 'native-base';

export const PhoneNumberInput = () => {
  return (
    <Input
      mx="3"
      placeholder="Input"
      w={{
        base: '75%',
        md: '25%',
      }}
      InputLeftElement={
        <Select>
          <Select.Item label="+33" value="+33" />
        </Select>
      }
    />
  );
};
