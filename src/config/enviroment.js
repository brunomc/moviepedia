export const env = () => {
  const prod = {
    url: 'https://api.themoviedb.org/3',
  };
  const dev = {
    url: 'https://api.themoviedb.org/3',
    api_key: '4fbdbdb7ab0a64a4ff94f65a19d7693a',
  };

  return dev;
};
