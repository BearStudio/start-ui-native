import axios from 'axios';
import {API_URL} from '@env';
import {
  retrieveAuthenticationToken,
  removeAuthenticationToken,
} from '../services/securityService';

const axiosConfig = axios.create({
  baseURL: API_URL,
});

axiosConfig.interceptors.request.use(
  async (config) => {
    const userToken = await retrieveAuthenticationToken();
    console.log({userToken});
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

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
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

axiosConfig.interceptors.response.use((response) => response?.data);

export {axiosConfig};
