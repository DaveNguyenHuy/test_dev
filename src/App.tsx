import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useMovieData } from './hooks/useMoviesData';

import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ShareVideoPage from './pages/ShareVideo';
import { ROUTES } from './utils/constants';
import { MovieContextData } from './utils/types';

export const MoviesContext = createContext<MovieContextData>({
  movies: [],
  appLoading: true,
  currentUser: null,
  updateMovies: () => null
});

function App() {
  const data = useMovieData();

  if (data.appLoading) return null;

  return (
    <MoviesContext.Provider value={data}>
      <Layout>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.share} element={<ShareVideoPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </MoviesContext.Provider>
  );
}

export default App;
