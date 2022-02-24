import React from 'react';

import { ScrollView, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import { Service } from 'react-native-ble-plx';
import { useQuery } from 'react-query';

import { getServices } from '@/modules/bluetooth/bluetooth.service';

import Characteristics from './Characteristics';

const Services = ({ device }) => {
  const { data: services, isLoading: isLoadingServices } = useQuery(
    'getServices',
    () => getServices(device),
    {
      initialData: [],
    }
  );

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {!isLoadingServices &&
          services?.map((service: Service, index) => (
            <View style={{ flex: 1 }} key={index}>
              <Text style={{ fontSize: 10 }}>
                {'[S]'} {service.uuid}
              </Text>
              <Characteristics device={device} service={service} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Services;

Services.propTypes = {
  device: PropTypes.object,
};

Services.defaultProps = {
  device: null,
};
