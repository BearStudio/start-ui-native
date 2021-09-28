import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useAccount = (config) =>
  useQuery('account', async () => axios.get('/account'), config);

export const useUpdateAccount = (config) =>
  useMutation((account) => axios.post('/account', account), {
    ...config,
  });

export const useLogin = (config) =>
  useMutation(
    async ({ email, password }) =>
      axios.post('/authenticate', {
        username: email,
        password,
      }),
    config
  );

export const useRegister = (config) =>
  useMutation(
    async ({ email, password }) =>
      axios.post('/register', {
        login: email,
        email,
        password,
      }),
    config
  );

export const useResetPasswordInit = (config) =>
  useMutation(
    (email) =>
      axios.post('/account/reset-password/init', email, {
        headers: { 'Content-Type': 'text/plain' },
      }),
    config
  );
