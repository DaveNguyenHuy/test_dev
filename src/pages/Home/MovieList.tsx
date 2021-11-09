import { MovieItem } from './MovieItem';

export const MovieList = () => {
  return (
    <div className="flex flex-col items-center pt-8 space-y-8">
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
      <MovieItem />
    </div>
  );
};
