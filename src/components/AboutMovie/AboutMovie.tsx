import { FC } from 'react';
import { IMovie } from '../../models';
import './index.css';

type TProps = {
  data: IMovie;
};

export const AboutMovie: FC<TProps> = ({ data }) => {
  return (
    <div className="about-movie">
      <h2 className="about-movie__title">О фильме</h2>
      <ul className="list-reset about-movie__list">
        <li className={data.language ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Язык оригинала</span>
          </div>
          <span className="about-movie__text">{data.language}</span>
        </li>

        <li className={data.budget ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Бюджет</span>
          </div>
          <span className="about-movie__text">{data.budget}</span>
        </li>

        <li className={data.revenue ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Выручка</span>
          </div>
          <span className="about-movie__text">{data.revenue}</span>
        </li>

        <li className={data.director ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Режыссёр</span>
          </div>
          <span className="about-movie__text">{data.director}</span>
        </li>

        <li className={data.production ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Продакшен</span>
          </div>
          <span className="about-movie__text">{data.production}</span>
        </li>

        <li className={data.awardsSummary ? 'about-movie__item' : 'about-movie__item--unvisible'}>
          <div className="about-movie__wrapper">
            <span className="about-movie__text">Награды</span>
          </div>
          <span className="about-movie__text">{data.awardsSummary}</span>
        </li>
      </ul>
    </div>
  );
};

export default AboutMovie;
