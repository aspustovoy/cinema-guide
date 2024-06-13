import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Movies } from '../../models';
import { useParams } from 'react-router';
import { setMovie } from '../../app/movieSlice';
import { Link } from 'react-router-dom';
import { genreNameTranslation } from '../../utils/genreNameTranslation';
import Api from '../../api/api';
import './index.css';

export const Genre: FC = () => {
  const dispatch = useAppDispatch();

  const { genreName } = useParams();

  const [movieList, setData] = useState<Movies>([]);
  const [count, setCount] = useState<number>(0);

  const getData = async (): Promise<void> => {
    if (genreName) {
      const data = await Api.getMovieByGenre(genreName, count);
      setCount(count + 1);

      if (count === 0) setData(data);
      else setData(movieList.concat(data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMovieToStorage = (index: number) => {
    dispatch(setMovie(movieList[index]));
    sessionStorage.setItem('movie', JSON.stringify(movieList[index]));
  };

  return (
    <div className="genre-list">
      <h2 className="genre-list__title">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.048 20.0012L26.2977 28.2507L23.9407 30.6077L13.334 20.0012L23.9407 9.39453L26.2977 11.7515L18.048 20.0012Z"
            fill="white"
          />
        </svg>
        {genreNameTranslation(genreName)}
      </h2>

      <ul className="list-reset genre-list__list">
        {movieList.map((movie, index) => (
          <div className="genre-list__item" key={movie.id}>
            <Link
              onClick={() => {
                handleMovieToStorage(index);
              }}
              className="genre-list__link"
              to={`/movie/${movieList[index].id}`}
            >
              <img src={movie.posterUrl} className="genre-list__img" />
            </Link>
          </div>
        ))}
      </ul>

      <button onClick={getData} className="btn-more btn-reset btn-primary">
        Показать ещё
      </button>
    </div>
  );
};

export default Genre;
