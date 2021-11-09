import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ShareVideoPage from './pages/ShareVideo';
import { Movie, MovieContextData } from './utils/types';

export const MoviesContext = createContext<MovieContextData>({
  movies: [],
  updateMovies: () => null
});

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const updateMovies = (data: Movie[]) => {
    setMovies(data);
  };

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
