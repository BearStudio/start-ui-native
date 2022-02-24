import React, { useContext } from 'react';

import { BleManager } from 'react-native-ble-plx';

interface BluetoothValue {
  bleManager: BleManager;
}

const BluetoothContext = React.createContext<BluetoothValue>(null);

export const useBluetoothContext = () => useContext(BluetoothContext);

export const BluetoothProvider = ({ children }) => {
  const bleManager = new BleManager();
  return (
    <BluetoothContext.Provider
      value={{
        bleManager,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
