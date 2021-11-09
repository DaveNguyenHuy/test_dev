import { FC } from 'react';
import { Movie } from '../../utils/types';
import { MovieItem } from './MovieItem';

interface Props {
  movies: Movie[];
}

export const MovieList: FC<Props> = ({ movies }) => {
  const renderContent = () => {
    if (!movies.length) {
      return <h2 className="text-xl">There is no movies...</h2>;
    }

    return movies.map((movie) => <MovieItem key={movie.id} movie={movie} />);
  };

  return <div className="flex flex-col items-center pt-8 space-y-8">{renderContent()}</div>;
};
