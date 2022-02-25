import React from 'react';

import { Box, IBoxProps, Text } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { Device, Service } from 'react-native-ble-plx';

import { useCharacteristics } from '@/modules/bluetooth/bluetooth.service';

type CharacteristicProps = IBoxProps & {
  device: Device;
  service: Service;
};

const Characteristics: React.FC<CharacteristicProps> = ({
  device,
  service,
  ...rest
}) => {
  const {
    data: characteristics,
    isLoading: isLoadingCharacteristics,
    isError: hasErrorCharacteristics,
  } = useCharacteristics(service, device);

  return (
    <Box {...rest}>
      {isLoadingCharacteristics && <ActivityIndicator />}
      {!isLoadingCharacteristics &&
        characteristics?.map((characteristic, index) => (
          <Box style={{ paddingLeft: 20 }} key={index}>
            <Text style={{ fontSize: 10 }}>
              {'[C]'} {characteristic.uuid}
            </Text>
            <Text>
              {hasErrorCharacteristics &&
                'An error occured while retrieving characteristics'}
            </Text>
          </Box>
        ))}
    </Box>
  );
};

export default Characteristics;
