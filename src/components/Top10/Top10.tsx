import { FC, useEffect, useState } from 'react';
import { Movies } from '../../models';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setMovie } from '../../app/movieSlice';
import Api from '../../api/api';
import './index.css';

const Top10: FC = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Movies>([]);

  const getData = async (): Promise<void> => {
    const data = await Api.getTop10();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMovieToStorage = (index: number) => {
    dispatch(setMovie(data[index]));
    sessionStorage.setItem('movie', JSON.stringify(data[index]));
  };

  return (
    <div className="top10">
      <h2 className="top10__title">Топ 10 фильмов</h2>

      <ul className="list-reset top10__list">
        {data.map((movie, index) => (
          <div className="top10__item" key={movie.id}>
            <Link
              onClick={() => {
                handleMovieToStorage(index);
              }}
              className="top10__link"
              to={`/movie/${data[index].id}`}
              key={data[index].id}
            >
              <span className="top10__place">{index + 1}</span>
              <img src={movie.posterUrl} className="poster-img" />
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Top10;
