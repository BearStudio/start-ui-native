import axios from 'axios';

import {
  retrieveAuthenticationToken,
  removeAuthenticationToken,
} from '../services/securityService';
import {CONFIG} from '../../environments/current/config';

export const logAxiosError = (error) => {
  console.error(
    `An error occurred while calling ${error.config.baseURL}${error.config.url} in ${error.config.method}`,
  );
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(
      'Error status and data',
      error.response.status,
      error.response.data,
    );
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('Error request', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message', error.message);
  }
};

axios.defaults.baseURL = CONFIG.API_URL;

axios.interceptors.request.use(
  async (config) => {
    console.debug(`Calling ${config.baseURL}${config.url} in ${config.method}`);
    const userToken = await retrieveAuthenticationToken();
    const newConfig = config;
    if (userToken) {
      newConfig.headers.common.Authorization = `Bearer ${userToken}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.debug(
      `Call to ${response.config.baseURL}${response.config.url} in ${response.config.method} succeeded`,
    );
    return response;
  },
  async (error) => {
    logAxiosError(error);
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      error.response.data.path !== '/api/authenticate'
    ) {
      await removeAuthenticationToken();
    }

    return Promise.reject(error);
  },
);

axios.interceptors.response.use((response) => response?.data);
