import { YouTubeGetID } from './constants';

test('should return youtube id', () => {
  let url = 'https://www.youtube.com/watch?v=Q5fd95h4HC';
  expect(YouTubeGetID(url)).toBe('Q5fd95h4HC');
  url = 'https://www.youtube.com/watch?v=Q5fd95h4HC&channel=test&name=test';
  expect(YouTubeGetID(url)).toBe('Q5fd95h4HC');
});
