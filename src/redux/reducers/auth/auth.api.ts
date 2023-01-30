import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const signIn = async (address: string, sig: string) => {
  return await axios.post<string>(`${API_ENDPOINT}/auth/signin`, {
    username: address,
    password: sig,
  });
};

export const refresh = async (jwt: string) => {
  return await axios.get<string>(`${API_ENDPOINT}/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
