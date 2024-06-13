import { IMovie, Movies } from '../models';
import { BASE_URL } from './config';

export const getRandom = async (): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/random`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getTop10 = async (): Promise<Movies> => {
  const url = `${BASE_URL}/movie/top10`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
