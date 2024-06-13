import { FC } from 'react';
import RandomMovie from '../../components/RandomMovie/RandomMovie';
import Top10 from '../../components/Top10/Top10';

export const HomePage: FC = () => {
  return (
    <>
      <RandomMovie />
      <Top10 />
    </>
  );
};

export default HomePage;
