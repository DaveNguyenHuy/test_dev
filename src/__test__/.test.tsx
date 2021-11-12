import { cleanup, render, screen } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

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

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

test('app should render correct', async () => {
  const { getByTestId, getByText, getByPlaceholderText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(getByTestId('movie-list')).toBeInTheDocument();
  });
  expect(getByText(/Login\/Register/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
});
