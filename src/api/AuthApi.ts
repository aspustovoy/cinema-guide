import { BASE_URL } from './config';
import { ILogin, IRegistration, IProfile } from '../models';

export const login = async (email: string, password: string): Promise<ILogin> => {
  const url = `${BASE_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const logout = async (): Promise<ILogin> => {
  const url = `${BASE_URL}/auth/logout`;
  const response = await fetch(url, {
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export const registration = async (
  email: string,
  password: string,
  name: string,
  surname: string,
): Promise<IRegistration> => {
  const url = `${BASE_URL}/user`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
      name,
      surname,
    }),
  });
  const data = await response.json();
  return data;
};

export const getProfile = async (): Promise<IProfile> => {
  const url = `${BASE_URL}/profile`;
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};
