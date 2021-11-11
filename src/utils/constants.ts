export const ROUTES = {
  home: '/',
  share: '/share'
};

export const YouTubeGetID = (url: string) => {
  let ID: string | string[] = '';
  const parsedUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsedUrl[2] !== undefined) {
    return parsedUrl[2].split(/[^0-9a-z_-]/i)[0];
  }
  return ID;
};
