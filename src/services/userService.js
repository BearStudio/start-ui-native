import axios from 'axios';
import { useMutation } from 'react-query';

export const useUpdateAccount = (config) =>
  useMutation((account) => axios.post('/account', account), {
    ...config,
  });

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
