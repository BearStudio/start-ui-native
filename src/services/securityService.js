import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_PREFIX, TOKEN_KEY} from './constants/storage';

export const retrieveAuthenticationToken = async () =>
  AsyncStorage.getItem(`${STORAGE_PREFIX}/${TOKEN_KEY}`);

export const storeAuthenticationToken = async (jwt) => {
  await AsyncStorage.setItem(`${STORAGE_PREFIX}/${TOKEN_KEY}`, jwt);
};

export const removeAuthenticationToken = () =>
  AsyncStorage.removeItem(`${STORAGE_PREFIX}/${TOKEN_KEY}`);
