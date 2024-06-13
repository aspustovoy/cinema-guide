import { FC, useEffect, useState } from 'react';
import { IMovie } from '../../models';
import { useAppDispatch } from '../../app/hooks';
import { setMovie } from '../../app/movieSlice';
import Movie from '../Movie/Movie';
import Api from '../../api/api';
import './index.css';

const RandomMovie: FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IMovie | null>(null);

  const getData = async (): Promise<void> => {
    const data = await Api.getRandom();
    setData(data);
    dispatch(setMovie(data));
    sessionStorage.setItem('movie', JSON.stringify(data));
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <div className="random-movie">
        <Movie data={data} getData={getData} />
      </div>
    );
  }
};

export default RandomMovie;
