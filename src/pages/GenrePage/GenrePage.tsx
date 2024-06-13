import { FC } from 'react';
import { useParams } from 'react-router';
import Genre from '../../components/Genre/Genre';

export const GenrePage: FC = () => {
  useParams();

  return <Genre />;
};

export default GenrePage;
