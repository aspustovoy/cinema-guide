import { Movies } from '../models';
import { BASE_URL } from './config';

export const getMovieByGenre = async (genre: string, page: number): Promise<Movies> => {
  const url = `${BASE_URL}/movie?count=15&page=${page}&genre=${genre}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
