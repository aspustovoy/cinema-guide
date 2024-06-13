import { FC } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import AboutMovie from '../../components/AboutMovie/AboutMovie';
import Movie from '../../components/Movie/Movie';

export const MoviePage: FC = () => {
  useParams();

  const data = useAppSelector((state) => state.movie.data);
  let movie;

  if (data) movie = data;
  else movie = JSON.parse(sessionStorage.movie);

  return (
    <>
      <Movie data={movie} />
      <AboutMovie data={movie} />
    </>
  );
};

export default MoviePage;
