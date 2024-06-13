import { FC, useState } from 'react';
import { IMovie } from '../../models';
import { getTimeFromMins } from '../../utils/getTimeFromMins';
import { getClassNameByRating } from '../../utils/getClassNameByRating';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsOpenAuth } from '../../app/modalAuthSlice';
import { setProfile } from '../../app/profileSlice';
import ModalTrailer from '../ModalTrailer/ModalTrailer';
import Api from '../../api/api';
import './index.css';

type TProps = {
  data: IMovie;
  getData?: () => Promise<void>;
};

export const Movie: FC<TProps> = ({ data, getData }) => {
  const dispatch = useAppDispatch();

  const { movieId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const profile = useAppSelector((state) => state.profile.data);

  const handleFavoritesBtn = () => {
    if (!profile) dispatch(setIsOpenAuth(true));
    else if (profile.favorites.includes(data.id.toString())) {
      delFavorites();
    } else {
      addFavorites();
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function updateProfile() {
    const data = await Api.getProfile();
    if (data.surname) dispatch(setProfile(data));
  }

  async function addFavorites() {
    const res = await Api.addFavorites(data.id.toString());
    if (res.result === true) updateProfile();
  }

  async function delFavorites() {
    const res = await Api.delFavorites(data.id.toString());
    if (res.result === true) updateProfile();
  }

  return (
    <>
      <div className="movie">
        <div className={data.backdropUrl ? 'movie__wrapper' : 'movie__wrapper--unvisible'}>
          <img className="movie__poster" src={data.backdropUrl} alt="poster" />
        </div>

        <div className="movie__card">
          <div className="movie__info">
            <span
              className={
                data.tmdbRating
                  ? 'movie__rating movie__rating' + getClassNameByRating(data.tmdbRating)
                  : 'movie__rating'
              }
            >
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.00105 12.1735L3.29875 14.8056L4.34897 9.5201L0.392578 5.86136L5.74394 5.22687L8.00105 0.333496L10.2581 5.22687L15.6095 5.86136L11.6531 9.5201L12.7033 14.8056L8.00105 12.1735Z"
                  fill="white"
                />
              </svg>
              {' ' + data.tmdbRating}
            </span>
            <span>{data.releaseYear}</span>
            <span>{data.genres[0]}</span>
            <span>{getTimeFromMins(data.runtime)}</span>
          </div>

          <h1 className="movie__title">{data.title}</h1>
          <p className="movie__descr">{data.plot}</p>

          <ul className="btns-list list-reset">
            <li
              className={movieId ? 'btns-list__item btns-list__item--short' : 'btns-list__item btns-list__item--long'}
            >
              <button onClick={openModal} className="btn-trailer btn-reset btn-primary">
                Трейлер
              </button>
            </li>

            <li className={movieId ? 'btns-list__item--unvisible' : 'btns-list__item'}>
              <Link className="btn-about btn-reset btn-secondary" to={`/movie/${data.id}`} key={data.id}>
                О фильме
              </Link>
            </li>

            <li className="btns-list__item">
              <button onClick={handleFavoritesBtn} className="btn-like btn-reset btn-secondary">
                {profile?.favorites.includes(data.id.toString()) ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                      fill="#B4A9FF"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" />
                  </svg>
                )}
              </button>
            </li>

            <li className={movieId ? 'btns-list__item--unvisible' : 'btns-list__item'}>
              <button className="btn-update btn-reset btn-secondary" onClick={getData}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ModalTrailer data={data} modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default Movie;
