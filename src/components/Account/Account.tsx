import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { setProfile } from '../../app/profileSlice';
import { Movies } from '../../models';
import { setMovie } from '../../app/movieSlice';
import Api from '../../api/api';
import './index.css';

export const Account: FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [movieList, setData] = useState<Movies>([]);
  const getData = async (): Promise<void> => {
    const data = await Api.getFavorites();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const dispatch = useAppDispatch();
  const handleMovieToStorage = (index: number) => {
    dispatch(setMovie(movieList[index]));
    sessionStorage.setItem('movie', JSON.stringify(movieList[index]));
  };

  const handleDelMovie = async (id: number) => {
    const res = await Api.delFavorites(id.toString());
    if (res.result === true) {
      getData();
      const data = await Api.getProfile();
      if (data.surname) dispatch(setProfile(data));
    }
  };

  const profile = useAppSelector((state) => state.profile.data);

  const [activeTab, setActiveTab] = useState(0);

  const logoutAction = async (): Promise<void> => {
    const data = await Api.logout();
    if (data.result === true) {
      sessionStorage.removeItem('auth');
      dispatch(setProfile(null));
    }
  };

  if (profile) {
    return (
      <div className="account">
        <h2 className="account__title">Мой аккаунт</h2>

        <div className="account__btns">
          <button
            onClick={() => setActiveTab(0)}
            className={activeTab === 0 ? 'account__tab-btn btn-reset active' : 'account__tab-btn btn-reset'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"
                fill="white"
              />
            </svg>
            {width <= 768 ? 'Избранное' : 'Избранные фильмы'}
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? 'account__tab-btn btn-reset active' : 'account__tab-btn btn-reset'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                fill="white"
              />
            </svg>
            {width <= 768 ? 'Настройки' : 'Настройка аккаунта'}
          </button>
        </div>

        <div className={activeTab === 0 ? 'account__tab account__tab--active' : 'account__tab'}>
          <ul className="list-reset account__list">
            {movieList.map((movie, index) => (
              <div className="account__item" key={movie.id}>
                <button onClick={() => handleDelMovie(movie.id)} className="account__btn-del btn-reset">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <Link
                  onClick={() => {
                    handleMovieToStorage(index);
                  }}
                  className="account__link"
                  to={`/movie/${movieList[index].id}`}
                  key={movieList[index].id}
                >
                  <img src={movie.posterUrl} className="poster-img" />
                </Link>
              </div>
            ))}
          </ul>
        </div>

        <div className={activeTab === 1 ? 'account__tab account__tab--active' : 'account__tab'}>
          <div className="account__info">
            <div className="account__wrapper">
              <div className="account__icon">{`${profile.name[0].toUpperCase() + profile.surname[0].toUpperCase()}`}</div>
              <div className="account__text">
                <span className="account__label">Имя Фамилия</span>
                <span>
                  {`${profile.name[0].toUpperCase() + profile.name.slice(1)} 
                                ${profile.surname[0].toUpperCase() + profile.surname.slice(1)}`}
                </span>
              </div>
            </div>
            <div className="account__wrapper">
              <div className="account__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="account__text">
                <span className="account__label">Электронная почта</span>
                <span>{profile.email}</span>
              </div>
            </div>
          </div>

          <Link onClick={logoutAction} className="btn-primary account__btn" to="/">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    );
  }
};

export default Account;
