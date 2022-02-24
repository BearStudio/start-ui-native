import React from 'react';

import { Box, Text } from 'native-base';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';

import { getCharacteristics } from '@/modules/bluetooth/bluetooth.service';

const Characteristics = ({ device, service }) => {
  const {
    data: characteristics,
    isLoading: isLoadingCharacteristics,
    isError: hasErrorCharacteristics,
  } = useQuery(
    `getCharacteristics${service.id}`,
    () => getCharacteristics(device, service),
    {
      initialData: [],
    }
  );

  return (
    <Box>
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

Characteristics.propTypes = {
  device: PropTypes.object,
  service: PropTypes.object,
};

Characteristics.defaultProps = {};
