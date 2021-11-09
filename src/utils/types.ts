export interface Movie {
  id: string;
  title: string;
  url: string;
  shared_by: string;
  description: string;
}

export interface MovieContextData {
  movies: Movie[];
  updateMovies: (movies: Movie[]) => void;
}
