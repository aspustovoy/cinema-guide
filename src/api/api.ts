import { getRandom, getTop10 } from './MoviesApi';
import { getMovieByGenre } from './GenresApi';
import { getMovieByTitle } from './SearchApi';
import { login, logout, registration, getProfile } from './AuthApi';
import { addFavorites, delFavorites, getFavorites } from './FavoritesApi';

const Api = {
  login,
  logout,
  registration,
  getProfile,
  getRandom,
  getTop10,
  getMovieByGenre,
  getMovieByTitle,
  getFavorites,
  addFavorites,
  delFavorites,
};

export default Api;
