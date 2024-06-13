import { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Movies } from '../../models';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMovie } from '../../app/movieSlice';
import { getTimeFromMins } from '../../utils/getTimeFromMins';
import { getClassNameByRating } from '../../utils/getClassNameByRating';
import { setIsOpenSearch } from '../../app/searchSlice';
import Api from '../../api/api';
import './index.css';

export const Search: FC = () => {
  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state) => state.search.searchIsOpen);

  useEffect(() => {
    if (modalIsOpen) handleSearchOn();
  }, [modalIsOpen]);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue] = useDebounce(inputValue, 500);
  const [movieList, setData] = useState<Movies | null>(null);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleInputClear = (index: number) => {
    setInputValue('');
    if (movieList) {
      dispatch(setMovie(movieList[index]));
      sessionStorage.setItem('movie', JSON.stringify(movieList[index]));
    }
  };

  const handleSearchOff = () => {
    setInputValue('');
    dispatch(setIsOpenSearch(false));
    searchWrapperRef.current!.classList.remove('search-wrapper--up');
    searchRef.current!.classList.remove('search--visible');
  };

  const handleSearchOn = () => {
    searchWrapperRef.current!.classList.add('search-wrapper--up');
    searchRef.current!.classList.add('search--visible');
  };

  const getData = async (): Promise<void> => {
    const data = await Api.getMovieByTitle(debouncedValue);
    setData(data);
  };

  useEffect(() => {
    if (debouncedValue) getData();
    else setData(null);
  }, [debouncedValue]);

  return (
    <div ref={searchWrapperRef} className="search-wrapper">
      <div ref={searchRef} className="search">
        <svg
          className="search__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            fillOpacity="0.5"
          />
        </svg>
        <input
          onChange={handleInputChange}
          value={inputValue}
          className="search__input"
          id="search"
          placeholder="Поиск"
        />
        <button onClick={handleSearchOff} className="btn-reset search__exit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
        </button>
        <div className={movieList?.length ? 'drop-down' : 'drop-down--unvisible'}>
          <ul className="drop-down__list list-reset">
            {movieList?.map((movie, index) => (
              <li key={movie.id} className="drop-down__item">
                <Link
                  onClick={() => handleInputClear(index)}
                  className="drop-down__link"
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                >
                  <div className="search-movie">
                    <img src={movie.posterUrl} className="search-movie__img" />
                    <div className="search-movie__text">
                      <div className="search-movie__info">
                        <span
                          className={
                            movie.tmdbRating
                              ? 'search-movie__rating search-movie__rating' + getClassNameByRating(movie.tmdbRating)
                              : 'search-movie__rating'
                          }
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.99944 7.6085L2.0605 9.25358L2.71689 5.95012L0.244141 3.66341L3.58874 3.26685L4.99944 0.208496L6.4101 3.26685L9.75469 3.66341L7.28198 5.95012L7.93835 9.25358L4.99944 7.6085Z"
                              fill="white"
                            />
                          </svg>
                          {' ' + movie.tmdbRating}
                        </span>
                        <span>{movie.releaseYear}</span>
                        <span>{movie.genres[0]}</span>
                        <span>{getTimeFromMins(movie.runtime)}</span>
                      </div>
                      <span className="search-movie__title">{movie.title}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
