import { FC, useContext, useState } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { MoviesContext } from '../../App';
import { updateMovieService } from '../../utils/services';
import { Movie, Like } from '../../utils/types';

interface Props {
  movie: Movie;
  updateMovie: (movie: Movie) => void;
}

export const MovieItem: FC<Props> = ({ movie, updateMovie }) => {
  const { currentUser } = useContext(MoviesContext);
  const [loading, setLoading] = useState(false);

  const like: Like | undefined = (movie.likes || []).find((it) => it.email === currentUser?.email);
  const { isLike, isDislike } = { isLike: !!like && like.like, isDislike: !!like && like.dislike };

  const toggleLike = async (key: 'like' | 'dislike') => {
    if (loading) return;
    const newMovie = { ...movie };
    if (!like) {
      const newLike = {
        email: currentUser.email,
        [key]: true
      };
      newMovie.likes = [...(newMovie.likes || []), newLike];
    } else {
      const other = key === 'like' ? 'dislike' : 'like';
      like[key] = !like[key];
      if (like[other]) like[other] = false;
    }
    setLoading(false);
    await updateMovieService(newMovie);
    updateMovie(newMovie);
    setLoading(false);
  };

  return (
    <div className="flex space-x-8 max-w-screen-lg w-full">
      <iframe
        src={movie.url}
        title={movie.title}
        height="240"
        width="360"
        className="border-gray-800 border flex-shrink-0 rounded-sm"
      />
      <div className="flex-1">
        <div className="flex justify-between w-full">
          <div className="w-4/5">
            <h2 data-testid="videoTitle" className="text-2xl font-bold">
              {movie.title}
            </h2>
            <p data-testid="videoSharedBy" className="text-gray-500">
              Shared by: {movie.shared_by}
            </p>
          </div>
          {currentUser && (
            <div className="space-x-2">
              <span
                className="p-1.5 cursor-pointer h-auto hover:bg-gray-200 rounded-full inline-block"
                onClick={() => toggleLike('like')}
              >
                <BiLike color={isLike ? 'blue' : 'black'} className="w-6 h-6" />
              </span>
              <span
                className="p-1.5 cursor-pointer h-auto hover:bg-gray-200 rounded-full inline-block"
                onClick={() => toggleLike('dislike')}
              >
                <BiDislike color={isDislike ? 'blue' : 'black'} className="w-6 h-6" />
              </span>
            </div>
          )}
        </div>
        <p className="mt-2 text-lg">Description:</p>
        <p data-testid="videoDescription" className="movie-description">
          {movie.description}
        </p>
      </div>
    </div>
  );
};
