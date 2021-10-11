import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import { AUTH_TOKEN_KEY } from '@/auth/auth.constants';
import { CONFIG } from '@/environment/config';

export const logAxiosErrorAndGet = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    return;
  }

  console.error(
    `An error occurred while calling ${error.config?.baseURL}${error.config?.url} in ${error.config?.method}`
  );

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(
      'Error status and data',
      error.response.status,
      error.response.data
    );
    return `${error.response.status}: ${error.response.data}`;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('Error request', error.request);
    return `Error request: ${JSON.stringify(error.request || {})}`;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message', error.message);
    return `Error message: ${error.message}`;
  }
};

axios.defaults.baseURL = CONFIG.API_URL;

axios.interceptors.request.use(
  async (config) => {
    console.debug(`Calling ${config.baseURL}${config.url} in ${config.method}`);
    const userToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const newConfig = config;
    if (userToken) {
      newConfig.headers.common.Authorization = `Bearer ${userToken}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.debug(
      `Call to ${response.config.baseURL}${response.config.url} in ${response.config.method} succeeded`
    );
    return response;
  },
  async (error) => {
    logAxiosErrorAndGet(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => response?.data);
