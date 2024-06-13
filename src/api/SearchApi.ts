import { Movies } from '../models';
import { BASE_URL } from './config';

export const getMovieByTitle = async (title: string): Promise<Movies> => {
  const url = `${BASE_URL}/movie?count=5&page=0&title=${title}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
