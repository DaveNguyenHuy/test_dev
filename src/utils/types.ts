export interface Movie {
  id: string;
  title: string;
  url: string;
  shared_by: string;
  description: string;
  likes: Array<Like>;
}

export interface MovieContextData {
  movies: Movie[];
  currentUser: any;
  appLoading: boolean;
  updateMovies: (movies: Movie[]) => void;
}

export interface Like {
  email: string;
  like?: boolean;
  dislike?: boolean;
}

export interface ShareMovieDto {
  title: string;
  url: string;
  shared_by: string;
  description: string;
}
