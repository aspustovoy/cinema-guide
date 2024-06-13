import { BASE_URL } from './config';
import { Movies } from '../models';
import { IFavorites } from '../models/Favorites';

export const getFavorites = async (): Promise<Movies> => {
  const url = `${BASE_URL}/favorites`;
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export const addFavorites = async (id: string): Promise<IFavorites> => {
  const url = `${BASE_URL}/favorites`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
};

export const delFavorites = async (id: string): Promise<IFavorites> => {
  const url = `${BASE_URL}/favorites/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
};
