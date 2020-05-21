export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_ENDPOINT
      : 'https://api.stocktwits.com'
};
