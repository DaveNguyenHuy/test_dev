import { render, cleanup, screen } from '@testing-library/react';
import { fireEvent, waitFor, within } from '@testing-library/dom';
import { Movie } from '../../../utils/types';
import { MovieItem } from '../MovieItem';
import { MovieList } from '../MovieList';
import { MoviesContext } from '../../../App';
import HomePage from '..';

beforeEach(() => {
  cleanup();
});

describe('testing home components', () => {
  test('Movie item should render content', () => {
    const data: Movie = {
      id: '1234',
      title: 'testing video',
      url: 'https://www.youtube.com/embed/test_id',
      description: 'testing video',
      shared_by: 'test@gmail.com',
      likes: []
    };

    const { getByTestId, getByTitle, container } = render(
      <MovieItem updateMovie={jest.fn()} movie={data} />
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByTitle(data.title)).toBeInTheDocument();
    const { getByText } = within(getByTestId('videoTitle'));
    expect(getByText(/testing video/i)).toBeInTheDocument();
    expect(getByTestId('videoSharedBy')).toHaveTextContent(data.shared_by);
    expect(getByTestId('videoDescription')).toHaveTextContent(data.description);
  });

  test('Movie list should render empty text', () => {
    const { getByText } = render(<MovieList movies={[]} />);
    expect(getByText('There is no movies...')).toBeInTheDocument();
  });

  test('Movie list should render content', () => {
    const mockMovies: Movie[] = [
      {
        id: '1',
        likes: [],
        title: 'movie 01',
        description: 'movie 01 description',
        shared_by: 'test@example.com',
        url: 'https://www.youtube.com/embed/test_1'
      },
      {
        id: '2',
        likes: [],
        title: 'movie 02',
        description: 'movie 02 description',
        shared_by: 'test@example.com',
        url: 'https://www.youtube.com/embed/test_2'
      }
    ];
    const { container } = render(<MovieList movies={mockMovies} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

jest.mock('@firebase/firestore', () => ({
  getDocs() {
    return Promise.resolve([
      {
        id: 1,
        data: () => ({
          title: 'testing video',
          url: 'https://www.youtube.com/embed/test_id',
          description: 'testing video',
          shared_by: 'test@gmail.com',
          likes: []
        })
      }
    ]);
  },
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn(),
  setDoc() {
    return Promise.resolve({
      status: '200'
    });
  }
}));

describe('test home page', () => {
  test('should render movies and can like/dislike for logged user', async () => {
    let movies: Movie[] = [];
    const updateMovies: any = jest.fn((data) => {
      movies = data;
    });

    const { rerender } = render(
      <MoviesContext.Provider
        value={{ movies, updateMovies, appLoading: false, currentUser: null }}
      >
        <HomePage />
      </MoviesContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(updateMovies).toHaveBeenCalled());

    rerender(
      <MoviesContext.Provider
        value={{ movies, updateMovies, appLoading: false, currentUser: null }}
      >
        <HomePage />
      </MoviesContext.Provider>
    );

    expect(screen.getByTestId('videoTitle')).toHaveTextContent('testing video');
    expect(movies).toEqual([
      {
        id: 1,
        title: 'testing video',
        url: 'https://www.youtube.com/embed/test_id',
        description: 'testing video',
        shared_by: 'test@gmail.com',
        likes: []
      }
    ]);
    const currentUser = {
      email: 'test@gmail.com'
    };

    rerender(
      <MoviesContext.Provider value={{ movies, updateMovies, appLoading: false, currentUser }}>
        <HomePage />
      </MoviesContext.Provider>
    );

    fireEvent.click(screen.getByTestId('dislike'));

    await waitFor(() => {
      expect(updateMovies).toHaveBeenCalled();
    });

    expect(movies[0].likes[0]).toEqual({
      email: 'test@gmail.com',
      dislike: true
    });

    rerender(
      <MoviesContext.Provider value={{ movies, updateMovies, appLoading: false, currentUser }}>
        <HomePage />
      </MoviesContext.Provider>
    );

    fireEvent.click(screen.getByTestId('like'));

    await waitFor(() => {
      expect(updateMovies).toHaveBeenCalledTimes(3);
      expect(movies[0].likes[0]).toEqual({
        email: 'test@gmail.com',
        dislike: false,
        like: true
      });
    });
    expect(screen.getByTestId('like')).toHaveAttribute('color', 'black');
    expect(screen.getByTestId('dislike')).toHaveAttribute('color', 'blue');

    rerender(
      <MoviesContext.Provider value={{ movies, updateMovies, appLoading: false, currentUser }}>
        <HomePage />
      </MoviesContext.Provider>
    );

    expect(screen.getByTestId('like')).toHaveAttribute('color', 'blue');
    expect(screen.getByTestId('dislike')).toHaveAttribute('color', 'black');
  });
});
