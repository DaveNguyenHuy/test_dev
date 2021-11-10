import { useState } from 'react';
import { Movie } from '../utils/types';

export const useMovieData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const updateMovies = (data: Movie[]) => {
    setMovies(data);
  };

  return { movies, updateMovies };
};
