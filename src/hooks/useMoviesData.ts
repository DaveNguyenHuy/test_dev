import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { Movie } from '../utils/types';

export const useMovieData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [appLoading, setAppLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
      setAppLoading(false);
    });
  }, []);

  const updateMovies = (data: Movie[]) => {
    setMovies(data);
  };

  const updateCurrentUser = (user: any) => {
    setCurrentUser(user);
  };

  return { movies, updateMovies, currentUser, appLoading, updateCurrentUser };
};
