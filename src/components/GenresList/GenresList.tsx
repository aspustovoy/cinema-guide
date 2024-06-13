import { FC } from 'react';
import { genres } from '../../models/Genres';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setGenre } from '../../app/genreSlice';
import './index.css';

const GenresList: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="genres">
      <h2 className="genres__title">Жанры фильмов</h2>
      <ul className="list-reset genres__list">
        {genres.map((genre) => (
          <div className="genres__item" key={genre.en}>
            <Link
              onClick={() => {
                dispatch(setGenre(genre));
              }}
              className="genres__link"
              to={`/genre/${genre.en}`}
            >
              <img src={'/images/' + genre.en + '.jpg'} className="genre-img" />
              <span className="genres__text">{genre.ru}</span>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
