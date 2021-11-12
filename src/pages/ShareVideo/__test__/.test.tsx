import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/dom';
import ShareVideoPage from '..';
import { MoviesContext } from '../../../App';
import { Movie } from '../../../utils/types';
import fetchMock from 'fetch-mock-jest';

jest.spyOn(window, 'alert').mockImplementation(() => {});

process.env.REACT_APP_YOUTUBE_API_KEY = 'api_key';

test('share video page should render correct', async () => {
  let movies: Movie[] = [];
  const updateMovies: any = jest.fn((data) => {
    movies = data;
  });

  const youtubeUrl = 'https://www.youtube.com/watch?v=Q5fd95h4HC';
  fetchMock.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&id=Q5fd95h4HC`,
    {
      items: [
        {
          id: 'gtMV-baxuz0',
          snippet: {
            title: 'test video',
            description: 'description'
          }
        }
      ]
    }
  );

  const { container, getByRole } = render(
    <BrowserRouter>
      <MoviesContext.Provider
        value={{
          movies,
          updateMovies,
          appLoading: false,
          currentUser: { email: 'test@gmail.com' }
        }}
      >
        <ShareVideoPage />
      </MoviesContext.Provider>
    </BrowserRouter>
  );

  expect(container.firstChild).toMatchSnapshot();

  const submitButton = getByRole('button');

  fireEvent.change(screen.getByPlaceholderText('youtube url'), {
    target: { value: youtubeUrl }
  });
  fireEvent.click(submitButton);

  expect(submitButton).toHaveTextContent(/loading.../i);
  await waitFor(() => {});
  expect(submitButton).toHaveTextContent(/share/i);

  fireEvent.click(submitButton);

  await waitFor(() => {});
  expect(window.alert).toBeCalledWith('share movie success');
});
