import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useMovieData } from './hooks/useMoviesData';

import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ShareVideoPage from './pages/ShareVideo';
import { MovieContextData } from './utils/types';

export const MoviesContext = createContext<MovieContextData>({
  movies: [],
  updateMovies: () => null
});

function App() {
  const { movies, updateMovies } = useMovieData();

  return (
    <MoviesContext.Provider value={{ movies, updateMovies }}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<ShareVideoPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </MoviesContext.Provider>
  );
}

export default App;
