export interface Movie {
  id: string;
  title: string;
  url: string;
  shared_by: string;
  description: string;
}

export interface MovieContextData {
  movies: Movie[];
  currentUser: any;
  appLoading: boolean;
  updateMovies: (movies: Movie[]) => void;
}

export interface ShareMovieDto {
  title: string;
  url: string;
  shared_by: string;
  description: string;
}
