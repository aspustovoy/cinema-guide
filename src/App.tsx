import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';

const LazyLayout = lazy(() => import('./components/Layout/Layout'));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage'));
const LazyGenrePage = lazy(() => import('./pages/GenrePage/GenrePage'));
const LazyMoviePage = lazy(() => import('./pages/MoviePage/MoviePage'));
const LazyAccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyLayout />}>
            <Route index element={<LazyHomePage />} />
            <Route path="genres" element={<LazyGenresPage />} />
            <Route path="genre/:genreName" element={<LazyGenrePage />} />
            <Route path="movie/:movieId" element={<LazyMoviePage />} />
            <Route path="account" element={<LazyAccountPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
