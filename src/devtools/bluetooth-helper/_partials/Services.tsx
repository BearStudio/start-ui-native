import React from 'react';

import { ScrollView, Text, View } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/primitives/View';
import { Device, Service } from 'react-native-ble-plx';

import { useServices } from '@/modules/bluetooth/bluetooth.service';

import Characteristics from './Characteristics';

type ServiceProps = IViewProps & {
  device: Device;
};

const Services: React.FC<ServiceProps> = ({ device }) => {
  const { data: services, isLoading: isLoadingServices } = useServices(device);

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
