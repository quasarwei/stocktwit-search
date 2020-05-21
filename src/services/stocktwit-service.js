import config from '../config';

const stocktwitService = {
  getSymbol(symbol, lasttweetID) {
    return fetch(
      `${config.API_ENDPOINT}/api/2/streams/symbol/${symbol}.json?since=${lasttweetID}`
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default stocktwitService;
