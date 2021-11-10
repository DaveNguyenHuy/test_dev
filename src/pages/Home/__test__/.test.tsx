import { render, cleanup, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { Movie } from '../../../utils/types';
import { MovieItem } from '../MovieItem';
import { MovieList } from '../MovieList';

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
      shared_by: 'test@gmail.com'
    };

    const { getByTestId, getByTitle, container } = render(<MovieItem movie={data} />);

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
    const movies: Movie[] = [
      {
        id: '1',
        title: 'movie 01',
        description: 'movie 01 description',
        shared_by: 'test@example.com',
        url: 'https://www.youtube.com/embed/test_1'
      },
      {
        id: '2',
        title: 'movie 02',
        description: 'movie 02 description',
        shared_by: 'test@example.com',
        url: 'https://www.youtube.com/embed/test_2'
      }
    ];

    const { container } = render(<MovieList movies={movies} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
