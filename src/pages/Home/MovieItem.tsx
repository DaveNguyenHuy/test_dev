import { FC } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { Movie } from '../../utils/types';

interface Props {
  movie: Movie;
}

export const MovieItem: FC<Props> = ({ movie }) => {
  return (
    <div className="flex space-x-8 max-w-screen-lg">
      <iframe
        src={movie.url}
        title={movie.title}
        height="240"
        width="360"
        className="border-gray-800 border flex-shrink-0 rounded-sm"
      />
      <div>
        <div className="flex justify-between w-full">
          <div className="w-4/5">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-gray-500">Shared by: {movie.shared_by}</p>
          </div>
          <div className="flex space-x-2">
            <BiLike className="w-6 h-6" />
            <BiDislike className="w-6 h-6" />
          </div>
        </div>
        <p className="mt-2 text-lg">Description:</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};
