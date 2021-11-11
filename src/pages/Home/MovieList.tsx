import { FC, useContext } from 'react';
import { MoviesContext } from '../../App';
import { Movie } from '../../utils/types';
import { MovieItem } from './MovieItem';

interface Props {
  movies: Movie[];
}

export const MovieList: FC<Props> = ({ movies }) => {
  const { updateMovies } = useContext(MoviesContext);

  const updateMovie = (item: Movie) => {
    updateMovies(movies.map((movie) => (movie.id === item.id ? item : movie)));
  };

  const renderContent = () => {
    if (!movies.length) {
      return <h2 className="text-xl">There is no movies...</h2>;
    }

    return movies.map((movie) => (
      <MovieItem updateMovie={updateMovie} key={movie.id} movie={movie} />
    ));
  };

  return <div className="flex flex-col items-center pt-8 space-y-8">{renderContent()}</div>;
};
