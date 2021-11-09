import { FC, useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../../App';
import { fetchMovies } from '../../utils/services';
import { MovieList } from './MovieList';

const HomePage: FC = () => {
  const [loading, setLoading] = useState(false);
  const { movies, updateMovies } = useContext(MoviesContext);

  useEffect(() => {
    if (!movies.length) setLoading(true);
    const getMovies = async () => {
      const data = await fetchMovies();
      updateMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  if (loading) return <h2 className="text-center pt-12 text-xl">Loading...</h2>;

  return <MovieList movies={movies} />;
};

export default HomePage;
